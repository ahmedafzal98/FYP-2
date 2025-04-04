import { Bell, PenBoxIcon, Search } from "lucide-react";
import { useSelector } from "react-redux";
import Seperator from "../components/Sepeartor";

const MainNavbar = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user.user);

  return (
    <>
      <nav className="text-black h-15 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="text-2xl ml-8 sm:text-3xl text-black flex">
            <span>SmartNewsHub</span>
          </div>
          <div className="h-11 bg-[#F9F9F9] w-60 rounded-3xl flex items-center pl-4 gap-4">
            <Search />
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
          <div className="flex gap-1 cursor-pointer ">
            <PenBoxIcon />
            <span>Write</span>
          </div>

          <Bell className="cursor-pointer" />

          <div className="h-8 w-8 bg-amber-600 rounded-full cursor-pointer">
            <img src="" alt="" srcset="" />
          </div>
        </div>
      </nav>
      <Seperator />
    </>
  );
};

export default MainNavbar;
