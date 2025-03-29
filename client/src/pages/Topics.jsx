import Seperator from "../components/Sepeartor";
import TopicButton from "../components/TopicButton";
import ActionButton from "../components/ActionButton";
import { topics } from "../../data/topics";
import { useEffect, useState } from "react";

const Topics = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const handleTopicClick = (topic) => {
    setSelectedTopics([...selectedTopics, topic]);
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
                  title={topic}
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
          isDisabled={true}
        />
      </div>
    </div>
  );
};

export default Topics;
