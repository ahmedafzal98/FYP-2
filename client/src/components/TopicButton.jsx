import { Plus } from "lucide-react";
import { useEffect } from "react";

const TopicButton = ({ title, onClick, selectedTopics }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer h-10 bg-topicsButton rounded-3xl flex items-center texce gap-2 p-3 w-fit"
    >
      <span className="text-textColor">{title}</span>
      <Plus className="w-6 h-6" />
    </div>
  );
};

export default TopicButton;
