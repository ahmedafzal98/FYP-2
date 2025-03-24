const ActionButton = ({ title, width, height, fontSize, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex justify-center items-center rounded-3xl bg-black text-button-text"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        fontSize: `${fontSize}px`,
      }}
    >
      {title}
    </div>
  );
};
export default ActionButton;
