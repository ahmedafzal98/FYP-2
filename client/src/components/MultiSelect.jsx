import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { topics } from "../../data/topics"; // Assuming this is an array of topic objects
import { useDispatch } from "react-redux";
import {
  setArticleData,
  setTriggerSubmit,
} from "../store/features/ArticleEditorSlice";

const animatedComponents = makeAnimated();

export default function MultiSelect() {
  const [selectedOptions, setSelectedOptions] = useState(null);

  const dispatch = useDispatch();

  const formattedTopic = topics.map((topic) => ({
    label: topic.name,
    value: topic.name.toLowerCase().replace(/\s+/g, "_"),
  }));

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  useEffect(() => {
    if (selectedOptions) {
      dispatch(
        setArticleData({
          tags: selectedOptions,
        })
      );
    }
  }, [selectedOptions]);

  return (
    <div className="w-full sm:w-[60%]">
      <Select
        className="w-full"
        onChange={handleChange}
        value={selectedOptions}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        placeholder="Add a Topic..."
        options={formattedTopic}
      />
    </div>
  );
}
