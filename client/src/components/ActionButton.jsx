const ActionButton = ({
  title,
  width,
  height,
  fontSize,
  onClick,
  isDisabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`"cursor-pointer flex justify-center items-center rounded-3xl ${
        !isDisabled ? "bg-gray-300 text-white" : "bg-black text-button-text"
      } "`}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        fontSize: `${fontSize}px`,
      }}
    >
      {title}
    </button>
  );
};
export default ActionButton;
