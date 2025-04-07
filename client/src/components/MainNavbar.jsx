import { Bell, Ellipsis, PenBoxIcon, Search } from "lucide-react";
import { useSelector } from "react-redux";
import Seperator from "../components/Sepeartor";
import { Link, Outlet, useLocation } from "react-router";

const MainNavbar = () => {
  const location = useLocation();

  if (location.pathname === "/writeArticle") {
    return (
      <>
        <nav className="text-black h-15 flex items-center justify-between overflow-hidden">
          <div className="flex gap-3 items-center">
            <div className="text-normal ml-6 sm:text-3xl text-black flex">
              <span>SmartNewsHub</span>
            </div>
            <div className="h-11 w-50 sm:w-60 flex items-center pl-4 gap-4">
              <span>Draft in Ahmed Afzal</span>
              <span className="text-black opacity-60">Saved</span>
            </div>
          </div>
          <div className="w-2xl justify-center flex mr-7 gap-8 items-center">
            <Link to="/writeArticle">
              <div className="bg-green-500 w-[74px] flex items-center hover:opacity-70 justify-center h-[36px] rounded-3xl p-2">
                <span className="text-white">Publish</span>
              </div>
            </Link>

            <Ellipsis strokeWidth={1} className="cursor-pointer" />
            <Bell strokeWidth={1} className="cursor-pointer" />

            <div className="h-8 w-8 bg-amber-600 rounded-full cursor-pointer">
              <img src="" alt="" srcset="" />
            </div>
          </div>
        </nav>
        <Seperator />
        <main className="p-4">
          <Outlet />
        </main>
      </>
    );
  }
  return (
    <>
      <nav className="text-black h-15 flex items-center justify-between overflow-hidden">
        <div className="flex gap-3 items-center">
          <div className="text-normal ml-6 sm:text-3xl text-black flex">
            <span>SmartNewsHub</span>
          </div>
          <div className="h-11 bg-[#F9F9F9] w-50 sm:w-60 rounded-3xl flex items-center pl-4 gap-4">
            <Search strokeWidth={1} />
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="focus:outline-none focus:border-none"
            />
          </div>
        </div>
        <div className="flex mr-7 gap-8 items-center">
          <Link to="/writeArticle">
            <div className="flex gap-1 cursor-pointer ">
              <PenBoxIcon strokeWidth={1} />
              <span>Write</span>
            </div>
          </Link>

          <Bell strokeWidth={1} className="cursor-pointer" />

          <div className="h-8 w-8 bg-amber-600 rounded-full cursor-pointer">
            <img src="" alt="" srcset="" />
          </div>
        </div>
      </nav>
      <Seperator />

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainNavbar;
