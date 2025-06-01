import { useState } from "react";
import Button from "../components/Button";
import Textarea from "../components/TextArea";
import React, { useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Plus, X, Image, Video, File } from "lucide-react";
import { Node, mergeAttributes } from "@tiptap/core";
import Placeholder from "@tiptap/extension-placeholder";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  setArticleData,
  setTriggerSubmit,
} from "../store/features/ArticleEditorSlice";
import ArticleModal from "./ArticleModal";

const MediaNode = Node.create({
  name: "media", // Node name
  inline: true, // Make it inline so that users can write text around it
  group: "inline", // Allow it to be in the same flow as text
  content: "inline*", // Can contain other inline nodes (like text)

  addAttributes() {
    return {
      src: {
        default: null,
      },
      type: {
        default: "image", // Can be 'image', 'video', 'file'
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img", // For images
      },
      {
        tag: "video", // For videos
      },
      {
        tag: "a", // For files (we're using a link to the file)
      },
    ];
  },

  renderHTML({ node }) {
    const { src, type } = node.attrs;

    if (type === "image") {
      return ["img", mergeAttributes({ src })];
    }
    if (type === "video") {
      return ["video", mergeAttributes({ src, controls: true, width: "400" })];
    }
    if (type === "file") {
      return [
        "a",
        mergeAttributes({ href: src, download: true, target: "_blank" }),
        node.attrs.src,
      ];
    }
    return null;
  },
});
const EditorLayout = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [editorBlocks, setEditorBlocks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // For images
  const [selectedVideos, setSelectedVideos] = useState([]); // For videos
  const [selectedFiles, setSelectedFiles] = useState([]); // For files
  const [openModal, setOpenModal] = useState(false);

  const [aiTopic, setAiTopic] = useState(""); // Topic for AI content generation
  const [aiContent, setAiContent] = useState(""); // AI generated content
  const [isGenerating, setIsGenerating] = useState(false);

  const triggerSubmit = useSelector(
    (state) => state.articleEditor.triggerSubmit
  );

  const dispatch = useDispatch();

  const toggleFab = () => {
    setIsFabExpanded((prev) => !prev);
  };

  const closeModal = () => setOpenModal(false);

  useEffect(() => {
    if (triggerSubmit) {
      setOpenModal(true);
      dispatch(setTriggerSubmit(false));
    }
  }, [triggerSubmit]);

  useEffect(() => {
    if (articleTitle || articleContent) {
      dispatch(
        setArticleData({
          title: articleTitle,
          content: articleContent,
        })
      );
    }
  }, [articleTitle, articleContent]);

  // Handle Image Uploads
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages((prev) => [
        ...prev,
        imageUrl, // Store the image URL
      ]);
      contentEditor
        .chain()
        .focus()
        .insertContent({
          type: "media", // Insert media node
          attrs: {
            src: imageUrl,
            type: "image", // Set type as image
          },
        })
        .run();
    });
  };

  // Handle Video Uploads
  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const videoUrl = URL.createObjectURL(file);
      setSelectedVideos((prev) => [
        ...prev,
        videoUrl, // Store the video URL
      ]);
      contentEditor
        .chain()
        .focus()
        .insertContent({
          type: "media", // Insert media node
          attrs: {
            src: videoUrl,
            type: "video", // Set type as video
          },
        })
        .run();
    });
  };

  //copy:
  // Handle File Uploads
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFiles((prev) => [
        ...prev,
        fileUrl, // Store the file URL
      ]);
      contentEditor
        .chain()
        .focus()
        .insertContent({
          type: "media", // Insert media node
          attrs: {
            src: fileUrl,
            type: "file", // Set type as file
          },
        })
        .run();
    });
  };

  //copy:
  const titleEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1] } }),
      Placeholder.configure({
        placeholder: "Enter a title...",
      }),
    ],
    onUpdate: ({ editor }) => {
      setArticleTitle(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none text-3xl font-bold text-gray-800",
      },
    },
  });

  //copy:
  const contentEditor = useEditor({
    extensions: [
      StarterKit,
      MediaNode,
      Placeholder.configure({
        placeholder: "Write your article...",
      }),
    ],
    onUpdate: ({ editor }) => {
      setArticleContent(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const prompt = input.trim();
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: prompt }),
      });
      const data = await res.json();
      const response = data.response;
      setChat((prev) => [...prev, { prompt, response }]);
    } catch (err) {
      setChat((prev) => [...prev, { prompt, response: "Server error." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleAddToEditor = (content) => {
    insertAIContentToEditor(content);
    setSidebarOpen(true);
  };

  const insertAIContentToEditor = (aiText) => {
    if (contentEditor) {
      contentEditor.commands.focus();
      contentEditor.commands.insertContent(aiText);
    }
  };

  return (
    <>
      {openModal && <ArticleModal isOpen={openModal} closeModal={closeModal} />}
      {/* Sidebar */}
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 relative overflow-hidden">
          {/* Chat Section */}
          <div
            className={`flex flex-col flex-1 transition-all duration-300 ${
              sidebarOpen ? "md:mr-[30rem]" : ""
            }`}
          >
            {/* Chat Messages - now scrollable inside fixed height */}
            <div
              className="flex-1 px-4 py-2 md:w-[70%] w-[90%] mx-auto overflow-y-auto border-1 border-gray-400"
              style={{ maxHeight: "calc(100vh - 190px)" }}
            >
              {chat.map((entry, idx) => (
                <div key={idx} className="rounded-xl border p-5 space-y-4 mb-4">
                  {/* Prompt */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                      P
                    </div>
                    <div className="text-gray-800 text-sm whitespace-pre-line">
                      {entry.prompt}
                    </div>
                  </div>
                  {/* Response */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold">
                      C
                    </div>
                    <div className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 border border-gray-200 rounded-md p-4 w-full">
                      {entry.response}
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-2 justify-end text-sm">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(entry.response)
                      }
                      className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => handleAddToEditor(entry.response)}
                      className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                      ✏️ Add to Editor
                    </button>
                  </div>
                </div>
              ))}
              {loading && <div className="text-gray-400">Loading...</div>}
              {/* Input Section - fixed at bottom */}
              <form onSubmit={handleSubmit}>
                <div
                  className={`flex fixed bottom-0 mb-4 gap-4  ${
                    sidebarOpen ? "md:w-[43%]" : "md:w-[68%]"
                  }`}
                >
                  <Textarea
                    className="w-full"
                    placeholder="Ask or search anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {/* Artcile_Submit_work */};{/* Floating Editor Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 bg-black text-white py-2 px-2 rounded-l hover:bg-gray-800"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "revert",
                // letterSpacing: "1px",
                // fontWeight: "500",
              }}
            >
              Editor
            </button>
          )}
          <div
            className={`w-[30rem] bg-white border-l fixed right-0 top-0 h-full flex flex-col shadow-lg z-50 transform transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h2 className="text-lg font-semibold">Editor</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-sm text-gray-600 hover:text-black"
              >
                Close
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto p-4 text-sm text-gray-700">
              {/* Floating Action Button for File Uploads */}
              <div className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-2 transition-all">
                <button
                  onClick={toggleFab}
                  className="cursor-pointer bg-blue-600 p-3 rounded-full text-white shadow-md hover:bg-blue-700 transition"
                >
                  {isFabExpanded ? <X /> : <Plus />}
                </button>

                {/* Expandable File Upload Options */}
                {isFabExpanded && (
                  <div className="flex flex-col gap-2 mt-2">
                    <button className="cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                      <label>
                        <Image size={20} />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </label>
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                      <label>
                        <Video size={20} />
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          multiple
                          onChange={handleVideoUpload}
                        />
                      </label>
                    </button>
                    <button className="text-blue-500 p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                      <label>
                        <File size={20} />
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileUpload}
                        />
                      </label>
                    </button>
                  </div>
                )}
              </div>

              {/* Title Editor */}
              <div className="space-y-4">
                <BubbleMenu
                  editor={titleEditor}
                  tippyOptions={{ duration: 100 }}
                >
                  <div className="flex space-x-2 p-1">
                    <button
                      onClick={() =>
                        titleEditor.chain().focus().toggleBold().run()
                      }
                      className={`px-3 py-1 text-white rounded ${
                        titleEditor.isActive("bold")
                          ? "bg-black"
                          : "bg-gray-400"
                      }`}
                    >
                      B
                    </button>
                    <button
                      onClick={() =>
                        titleEditor.chain().focus().toggleItalic().run()
                      }
                      className={`px-3 py-1 text-white rounded ${
                        titleEditor.isActive("italic")
                          ? "bg-black"
                          : "bg-gray-400"
                      }`}
                    >
                      I
                    </button>
                  </div>
                </BubbleMenu>
                <EditorContent editor={titleEditor} />
              </div>

              {/* Divider */}
              {/* <div className="border-t border-gray-300 my-4"></div> */}

              {/* Content Editor */}
              <div>
                <BubbleMenu
                  editor={contentEditor}
                  tippyOptions={{ duration: 100 }}
                >
                  <div className="flex space-x-2 p-1">
                    <button
                      onClick={() =>
                        contentEditor.chain().focus().toggleBold().run()
                      }
                      className={`px-3 py-1 text-white rounded ${
                        contentEditor.isActive("bold")
                          ? "bg-black"
                          : "bg-gray-400"
                      }`}
                    >
                      B
                    </button>
                    <button
                      onClick={() =>
                        contentEditor.chain().focus().toggleItalic().run()
                      }
                      className={`px-3 py-1 text-white rounded ${
                        contentEditor.isActive("italic")
                          ? "bg-black"
                          : "bg-gray-400"
                      }`}
                    >
                      I
                    </button>
                  </div>
                </BubbleMenu>
                <EditorContent
                  editor={contentEditor}
                  className="min-h-[300px]"
                />
              </div>

              {/* Show AI content + Add to Editor Button */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorLayout;
