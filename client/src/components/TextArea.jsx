// src/components/ui/textarea.jsx
import React from "react";

const TextArea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${className}`}
      {...props}
    />
  );
};
export default TextArea;
