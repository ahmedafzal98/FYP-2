import {
  BookmarkMinus,
  CircleMinus,
  Ellipsis,
  Hand,
  MessageCircle,
} from "lucide-react";
import Seperator from "../components/Sepeartor";
import ActionButton from "../components/ActionButton";

const ArticleDetail = () => {
  const tags = [
    "React Js Tutorials",
    "React",
    "React Js Development",
    "Reactjs",
    " Reactive Programming",
    "React",
  ];
  return (
    <section className="">
      <div className="flex flex-col items-center ">
        <span className="text-[#242424] text-5xl font-bold w-1/2">
          The Second ‘ChatGPT Moment’ is Here
        </span>

        <div className="flex flex-col w-1/2 mt-[3%]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-red-500 cursor-pointer hover:opacity-50 rounded-full mt-2"></div>
            <div className="flex flex-col items-center">
              <div className="flex w-full gap-4">
                <span className="text-base font-light text-[#242424] cursor-pointer hover:underline">
                  Ignacio de Gregorio
                </span>

                <span className="text-base font-light text-[#242424] cursor-pointer hover:underline">
                  Follow
                </span>
              </div>
              <div className="flex justify-between  w-full items-center gap-3">
                <span className="text-[#6B6B6B]">12 min read</span>
                <span className="text-[#6B6B6B]">3 days ago</span>
              </div>
            </div>
          </div>
          <div className="gap-4 flex flex-col mt-[3%]">
            <Seperator />

            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <div className="flex gap-1">
                  <Hand strokeWidth={1} />
                  <span className="text-black font-extralight">12K</span>
                </div>
                <div className="flex gap-1">
                  <MessageCircle strokeWidth={1} />
                  <span className="text-black font-extralight">298</span>
                </div>
              </div>
              <div className="flex items-center gap-6 w-1/2">
                <CircleMinus strokeWidth={1} />
                <BookmarkMinus strokeWidth={1} />
                <Ellipsis strokeWidth={1} />
              </div>
            </div>
            <Seperator />
          </div>
        </div>
        <div className="w-1/2 h-1/2 mt-[5%] flex flex-col items-center justify-center">
          <img
            src="https://miro.medium.com/v2/resize:fit:2000/format:webp/0*BwYfdzBCeWWX8NY7"
            alt="Article"
            className="w-full h-full object-contain"
          />
          <div className="mt-5">
            <span className="text-black text-2xl font-extralight font-sans leading-normal">
              In this day and age, the world can’t live without mobile and web
              applications. Everything is digitized, from booking cabs to
              ordering food to making bank transactions. Thanks to the efficient
              frameworks and libraries that provide a seamless user experience,
              One such robust frontend library is React. Let's talk about it.
              What is React ? React is a JavaScript-based UI development
              library. Facebook and an open-source developer community run it.
              Although React is a library rather than a language, it is widely
              used in web development. The library first appeared in May 2013
              and is now one of the most commonly used front-end libraries for
              web development. React offers various extensions for entire
              application architectural support, such as Flux and React Native,
              beyond more UI.
            </span>
          </div>
          <div className="w-full mt-[3%] flex gap-3 flex-wrap">
            {tags &&
              tags.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="h-9 rounded-2xl flex justify-center items-center border border-[#F2F2F2] bg-[#F2F2F2] p-3"
                  >
                    <span className="text-[#242424] text-base">{tag}</span>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center w-full mt-4 justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-500 cursor-pointer hover:opacity-50 rounded-full mt-2"></div>
              <div className="flex flex-col items-center">
                <div className="flex w-full gap-4">
                  <span className="text-[#242424] font-normal text-2xl cursor-pointer hover:underline">
                    Written by Ahmed Afzal
                  </span>
                </div>
                <div className="flex justify-between  w-full items-center gap-3">
                  <span className="text-[#6B6B6B] cursor-pointer hover:underline">
                    147 Followers
                  </span>
                  <span className="text-[#6B6B6B] cursor-pointer hover:underline">
                    6 Following
                  </span>
                </div>
              </div>
            </div>
            <ActionButton title="Follow" height="38" width="74" />
          </div>
          <div className="mt-5 w-5/6 mb-[5%]">
            <span>
              I'm a senior software engineer specializing in Java Spring Boot
              Microservices. I'm also a dedicated blogger at javadzone.com where
              I share java/springboot, etc.
            </span>
          </div>
          <Seperator />
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;
