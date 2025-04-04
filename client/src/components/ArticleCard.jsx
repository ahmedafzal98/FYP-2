import {
  BookmarkMinus,
  CircleMinus,
  Ellipsis,
  Hand,
  MessageCircle,
} from "lucide-react";

import Seperator from "./Sepeartor";
import { Link } from "react-router";

const ArticleCard = () => {
  return (
    <section className="flex items-center w-full ml-6 mt-6">
      <div className="w-1/2">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-red-600 cursor-pointer hover:opacity-50"></div>
          <span className="text-black cursor-pointer hover:underline">
            Ahmed Afzal
          </span>
        </div>
        <div className="w-full flex flex-wrap cursor-pointer mt-6">
          <Link to="/articleDetail" className="flex flex-col gap-3">
            <span className="text-black font-bold text-2xl leading-tight">
              300+ DevOps Engineer Commands, Tools, and Concepts You Must Know
            </span>
            <span className="text-base text-[#6B6B6B]">
              Bookmark This!!! Commands, Scripts, Hacks, Tools, Tricks, Tips!
            </span>
            <div className="mb-6 flex items-center justify-between mt-3">
              <div className="flex items-center gap-6 w-1/2">
                <span className="text-[#6B6B6B] text-[13px]">Jan 20</span>
                <div className="flex gap-1">
                  <Hand strokeWidth={1} />
                  <span className="text-black font-extralight">12K</span>
                </div>

                <div className="flex gap-1">
                  <MessageCircle strokeWidth={1} />
                  <span className="text-black font-extralight">298</span>
                </div>
              </div>
              <div className=" flex items-center gap-6 w-1/2">
                <CircleMinus strokeWidth={1} />
                <BookmarkMinus strokeWidth={1} />
                <Ellipsis strokeWidth={1} />
              </div>
            </div>
          </Link>
          <Seperator />
        </div>
      </div>

      <Link to="/articleDetail">
        <div className="w-40 h-36 rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105">
          <img
            src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*kronPqvBjIJFWp2ANVlpwA.jpeg"
            alt="Article"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    </section>
  );
};
export default ArticleCard;
