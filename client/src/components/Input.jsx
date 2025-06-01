const InputFields = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

export default InputFields;
