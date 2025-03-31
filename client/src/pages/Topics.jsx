import Seperator from "../components/Sepeartor";
import TopicButton from "../components/TopicButton";
import ActionButton from "../components/ActionButton";
import { topics } from "../../data/topics";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Topics = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const handleTopicClick = (topic) => {
    setSelectedTopics((prevTopics) => {
      const isAlreadySelected = prevTopics.some((t) => t.name === topic.name);

      if (!isAlreadySelected) {
        return [...prevTopics, { ...topic, isSelected: true }];
      }
      return prevTopics
        .map((t) =>
          t.name === topic.name ? { ...t, isSelected: !t.isSelected } : t
        )
        .filter((t) => t.isSelected); // Remove items where isSelected becomes false
    });
  };

  const handleContinueButton = async () => {
    if (selectedTopics.length > 2) {
      const topics = selectedTopics.map((topic) => topic.name);
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await fetch(`${BASE_URL}/api/topics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topics, id: user._id }),
        });

        const result = await response.json();
        console.log(result);

        if (result) {
          navigate("/articles");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
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
            topics.map((topic) => {
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
          onClick={() => handleContinueButton()}
          height="38"
          width="238"
          from="Topics"
          isDisabled={selectedTopics.length > 2}
        />
      </div>
    </div>
  );
};

export default Topics;
