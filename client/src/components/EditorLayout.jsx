import React, { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Plus, X, Image, Video, File } from "lucide-react";
import { Node, mergeAttributes } from "@tiptap/core";
import Placeholder from "@tiptap/extension-placeholder";

// Define a Media Node to handle images, videos, and files
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
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // For images
  const [selectedVideos, setSelectedVideos] = useState([]); // For videos
  const [selectedFiles, setSelectedFiles] = useState([]); // For files

  const toggleFab = () => {
    setIsFabExpanded((prev) => !prev);
  };

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

  const titleEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1] } }),
      Placeholder.configure({
        placeholder: "Enter a title...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "outline-none text-3xl font-bold text-gray-800",
      },
    },
  });

  const contentEditor = useEditor({
    extensions: [
      StarterKit,
      MediaNode, // Register the custom Media Node
      Placeholder.configure({
        placeholder: "Write your article...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none",
      },
    },
  });

  if (!titleEditor || !contentEditor) return null;

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4">
      <div className="relative p-8 mx-auto space-y-4 max-w-3xl">
        {/* FAB - Always visible */}
        <div className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-2 transition-all">
          <button
            onClick={toggleFab}
            className="cursor-pointer bg-blue-600 p-3 rounded-full text-white shadow-md hover:bg-blue-700 transition"
          >
            {isFabExpanded ? <X /> : <Plus />}
          </button>

          {/* Expandable Options */}
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
        <div>
          <BubbleMenu editor={titleEditor} tippyOptions={{ duration: 100 }}>
            <div className="flex space-x-2 p-1">
              <button
                onClick={() => titleEditor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 text-white rounded ${
                  titleEditor.isActive("bold") ? "bg-black" : "bg-gray-400"
                }`}
              >
                B
              </button>
              <button
                onClick={() => titleEditor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 text-white rounded ${
                  titleEditor.isActive("italic") ? "bg-black" : "bg-gray-400"
                }`}
              >
                I
              </button>
            </div>
          </BubbleMenu>
          <EditorContent editor={titleEditor} />
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Content Editor */}
        <div>
          <BubbleMenu editor={contentEditor} tippyOptions={{ duration: 100 }}>
            <div className="flex space-x-2 p-1">
              <button
                onClick={() => contentEditor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 text-white rounded ${
                  contentEditor.isActive("bold") ? "bg-black" : "bg-gray-400"
                }`}
              >
                B
              </button>
              <button
                onClick={() =>
                  contentEditor.chain().focus().toggleItalic().run()
                }
                className={`px-3 py-1 text-white rounded ${
                  contentEditor.isActive("italic") ? "bg-black" : "bg-gray-400"
                }`}
              >
                I
              </button>
            </div>
          </BubbleMenu>
          <EditorContent editor={contentEditor} className="min-h-[300px]" />
        </div>
      </div>
    </form>
  );
};

export default EditorLayout;
