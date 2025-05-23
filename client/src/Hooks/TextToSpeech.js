import React from "react";
const TextToSpeech = () => {
  const [isSpeaking, setSpeaking] = React.useState(false);
  const synth = window.speechSynthesis;
  const speak = (text) => {
    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
      setSpeaking(true);

      utterance.onend = () => {
        setSpeaking(false);
      };
    } else {
      synth.cancel();
      setSpeaking(false);
    }
  };

  React.useEffect(() => {
    synth.cancel();
    setSpeaking(false);
  }, [location.pathname]);
  return { isSpeaking, speak };
};
export default TextToSpeech;
