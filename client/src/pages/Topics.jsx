import Seperator from "../components/Sepeartor";
import TopicButton from "../components/TopicButton";
import ActionButton from "../components/ActionButton";
import { topics } from "../../data/topics";
import { useEffect, useState } from "react";

const Topics = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleTopicClick = (topic) => {
    setSelectedTopics((prevTopics) => {
      // Check if the topic is already in the selected topics array
      const isAlreadySelected = prevTopics.some((t) => t.name === topic.name);

      if (!isAlreadySelected) {
        // If the topic is not in the list, add it with isSelected: true
        return [...prevTopics, { ...topic, isSelected: true }];
      }

      // If the topic is already in the list, toggle isSelected and remove if false
      return prevTopics
        .map((t) =>
          t.name === topic.name ? { ...t, isSelected: !t.isSelected } : t
        )
        .filter((t) => t.isSelected); // Remove items where isSelected becomes false
    });
  };

  return (
    <div className="flex items-center flex-col">
      <div className="h-14 flex flex-col justify-center items-center">
        <span className="text-3xl font-bold ">Smart News Hub</span>
      </div>
      <Seperator />

      <div className="gap-5 flex flex-col items-center mt-[7%]">
        <h2 className="font-serif text-[28px] font-light">
          What are you interested in?
        </h2>
        <p className="text-textColor">Choose three or more.</p>
      </div>
      <div className="mt-5 flex justify-center items-center">
        <div className="flex flex-wrap gap-6 w-7/10">
          {topics &&
            topics.map((topic, index) => {
              return (
                <TopicButton
                  title={topic.name}
                  onClick={() => handleTopicClick(topic)}
                  selectedTopics={selectedTopics}
                />
              );
            })}
        </div>
      </div>
      <div className="bg-white w-full h-18 flex justify-center items-center bottom-0 fixed">
        <ActionButton
          title="Continue"
          height="38"
          width="238"
          isDisabled={selectedTopics.length > 2}
        />
      </div>
    </div>
  );
};

export default Topics;
