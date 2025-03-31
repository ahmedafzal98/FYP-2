import { Check, Plus } from "lucide-react";
import { useEffect } from "react";
import { topics } from "../../data/topics";

const TopicButton = ({ title, onClick, selectedTopics }) => {
  const isSelected = selectedTopics.some(
    (topic) => topic.name === title && topic.isSelected
  );

  return (
    <>
      <div
        onClick={onClick}
        className={`cursor-pointer h-10 bg-topicsButton rounded-3xl flex items-center gap-2 p-3 w-fit ${
          isSelected ? "border border-green-600" : ""
        }`}
      >
        <span className="text-textColor">{title}</span>

        {isSelected ? (
          <Check className="w-6 h-6 text-green-500" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </div>
    </>
  );
};

export default TopicButton;
