import { Node, mergeAttributes } from "@tiptap/core";

// Custom node to handle image, video, and file
const MediaNode = Node.create({
  name: "media",
  inline: true, // Ensure that the node is inline so it can be placed alongside text
  group: "inline",
  content: "inline*", // Allow inline content inside

  addAttributes() {
    return {
      src: {
        default: null,
      },
      type: {
        default: "image", // Default is image, but can be 'video' or 'file'
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img",
      },
      {
        tag: "video",
      },
      {
        tag: "a",
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
        "Download",
      ];
    }

    return null;
  },
});

export default MediaNode;
