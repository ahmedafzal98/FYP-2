import { ArrowRight } from "lucide-react";
import AuthModal from "../components/AuthModal";
import { useState } from "react";

const AboutUs = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isactive, setIsactive] = useState(null);
  const auth_Button = ["Sign in", "Sign up"];
  return (
    <>
      <AuthModal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
      />
      <div className="bg-black text-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <h1 className="text-2xl ml-12 sm:text-3xl text-white">
            Smart News Hub
          </h1>
          <div className="space-x-4">
            {auth_Button &&
              auth_Button.map((btn, ind) => (
                <button
                  key={ind}
                  onClick={() => setIsOpenModal(true)}
                  className="text-sm text-white hover:underline cursor-pointer"
                >
                  {btn}
                </button>
              ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 md:px-24 py-16 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-10">
            Everyone has a story to tell
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            SmartNewsHub is built to reshape how news is discovered, consumed,
            and shared. In a world where content overload is real and meaningful
            journalism often gets buried, we offer a platform that filters noise
            and delivers what matters. It’s fast, intuitive, and thoughtfully
            personalized for every user.
          </p>

          <p className="text-lg text-gray-300 bg-gray-800 p-4 rounded mb-6">
            Our mission is simple—make quality information accessible and
            engagement effortless. Whether you're browsing casually or searching
            deeply, SmartNewsHub learns your preferences and curates your feed
            accordingly. It’s your news, your way.
          </p>

          <p className="text-gray-400 text-sm leading-6 mb-6">
            From AI-generated article summaries that save time, to
            voice-assisted browsing that makes the app hands-free, we are
            building tools that enhance rather than overwhelm. Users can also
            write and publish their own articles with help from AI-based writing
            assistants, giving everyone a voice and a platform.
          </p>

          <p className="text-gray-400 text-sm leading-6 mb-6">
            Accessibility drives our features—automatic translation makes
            content multilingual, theme switching offers visual comfort, and
            recommendation engines keep your feed fresh and relevant. Whether
            you're catching headlines or exploring deep dives, SmartNewsHub
            adapts to you.
          </p>

          <p className="text-gray-400 text-sm leading-6">
            We're not here to sell your data or flood your screen with ads.
            We're here to help you focus, discover, and engage with the stories
            that shape the world. SmartNewsHub is powered by purpose, shaped by
            users, and driven by a future where thoughtful content thrives.
          </p>
        </main>

        {/* Call to Action Buttons - Accurate Medium Style */}
        <div className="border-t border-gray-800">
          {[
            { text: "Start reading", light: true },
            { text: "Start writing", light: false },
            { text: "Become a member", light: false },
          ].map(({ text, light }, i) => (
            <div
              key={i}
              onMouseOver={() => setIsactive(i)}
              onClick={() => setIsOpenModal(true)}
              className={`w-full flex justify-between items-center cursor-pointer px-6 md:px-24 py-10 border-t border-gray-800 ${
                isactive === i
                  ? "bg-white text-black"
                  : "bg-[#1a1a1a] text-white"
              }`}
            >
              <span className="text-2xl font-serif">{text}</span>
              <ArrowRight size={24} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-xs text-gray-500 px-6 py-4 border-t border-gray-800">
          <div className="flex flex-wrap gap-4 mb-2">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Help
            </a>
            <a href="#" className="hover:underline">
              Teams
            </a>
            <a href="#" className="hover:underline">
              Press
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutUs;
