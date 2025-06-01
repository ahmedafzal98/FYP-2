import React from "react";

const Button = ({ children, variant, size, className = "", ...props }) => {
  const baseClass =
    "rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClass =
    variant === "outline"
      ? "border border-gray-500 text-gray-700 hover:bg-gray-100"
      : variant === "secondary"
      ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
      : "bg-blue-600 text-white hover:bg-blue-700";

  const sizeClass =
    size === "sm"
      ? "text-sm px-3 py-1.5"
      : size === "lg"
      ? "text-lg px-6 py-3"
      : "text-base px-4 py-2";

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
