import { Bell, Ellipsis, PenBoxIcon, TagIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Seperator from "../components/Sepeartor";
import { Link, Outlet, useLocation } from "react-router";
import { setTriggerSubmit } from "../store/features/ArticleEditorSlice";
import { useCallback, useEffect, useState } from "react";
import lodash from "lodash";
import SearchPopover from "./SearchPopover";
import Search from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";

const MainNavbar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  const handleSubmitClick = () => {
    dispatch(setTriggerSubmit(true));
  };

  // useEffect(() => {
  //   const fetchSearchResult = async () => {
  //     try {
  //       const url = `${
  //         import.meta.env.VITE_BASE_URL
  //       }/api/articles/search?q=${searchQuery}`;

  //       const res = await fetch(url, {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       const result = await res.json();
  //       setSearchResult(result);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   const debounceSearch = lodash.debounce(() => {
  //     fetchSearchResult();
  //   }, 500);

  //   if (searchQuery) {
  //     debounceSearch();
  //   }
  //   return () => {
  //     debounceSearch.cancel();
  //   };
  // }, [searchQuery]);

  if (location.pathname === "/writeArticle") {
    return (
      <>
        <nav className="text-black h-15 flex items-center justify-between overflow-hidden">
          <div className="flex gap-3 items-center">
            <span className="text-normal ml-6 sm:text-3xl text-black dark:text-white flex">
              SmartNewsHub
            </span>
          </div>
          <div className="w-2xl justify-center flex mr-7 gap-8 items-center">
            <div
              onClick={handleSubmitClick}
              className="bg-green-500 cursor-pointer w-[74px] flex items-center hover:opacity-70 justify-center h-[36px] rounded-3xl p-2"
            >
              <span className="text-white">Publish</span>
            </div>

            <div className="h-8 w-8 cursor-pointer">
              <ProfileMenu avator={user.photo} />,
              {/* <img
                src={user.photoUrl}
                alt="User photo"
                className="rounded-full"
              /> */}
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
      <nav className="text-black w-full h-15 flex items-center">
        <div className="flex w-[70%] gap-3 items-center">
          <div className="text-normal ml-6 sm:text-3xl text-black dark:text-white flex">
            <span>SmartNewsHub</span>
          </div>
          <div>
            <div className="w-full">
              {/* <Search strokeWidth={1} /> */}
              <Search />
            </div>
            {searchResult.map((item) => {
              return (
                <div className="absolute top-[7%] rounded-sm bg-white w-79 h-auto pb-4 shadow-lg">
                  <div className="mt-5 ml-4 flex flex-col mr-4">
                    <span className="text-[#6B6B6B] mb-4 text-[18px] font-light">
                      People
                    </span>
                    <Seperator />

                    <div className="flex mt-3 items-center cursor-pointer gap-2">
                      <div className="h-7 w-7 cursor-pointer">
                        <img
                          src="https://miro.medium.com/v2/resize:fill:176:176/0*etOEGNrj-_foaoKk.jpeg"
                          alt="User photo"
                          className="rounded-full"
                        />
                      </div>
                      <span>Ahmed Afzal</span>
                    </div>
                    <div className="flex mt-3 items-center cursor-pointer gap-2">
                      <div className="h-7 w-7 cursor-pointer">
                        <img
                          src="https://miro.medium.com/v2/resize:fill:176:176/0*etOEGNrj-_foaoKk.jpeg"
                          alt="User photo"
                          className="rounded-full"
                        />
                      </div>
                      <span>Ahmed Afzal</span>
                    </div>
                    <div className="flex mt-3 items-center cursor-pointer gap-2 mb-3 ">
                      <div className="h-7 w-7 cursor-pointer">
                        <img
                          src="https://miro.medium.com/v2/resize:fill:176:176/0*etOEGNrj-_foaoKk.jpeg"
                          alt="User photo"
                          className="rounded-full"
                        />
                      </div>
                      <span>Ahmed Afzal</span>
                    </div>

                    <span className="mt-3 text-[#6B6B6B] text-[18px] font-light mb-4">
                      Tags
                    </span>

                    <Seperator />

                    <div className="flex flex-col mt-2 gap-3">
                      <div className="flex gap-2">
                        <TagIcon />
                        <span>React</span>
                      </div>
                      <div className="flex gap-2">
                        <TagIcon />
                        <span>React</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex mr-7 w-[30%] gap-8 items-end justify-end">
          <ThemeToggle />
          <Link to="/writeArticle">
            <div className="flex gap-1 cursor-pointer text-black dark:text-white">
              <PenBoxIcon strokeWidth={1} />
              <span>Write</span>
            </div>
          </Link>

          <Bell
            strokeWidth={1}
            className="cursor-pointer  text-black dark:text-white"
          />

          <div className="h-8 w-8 cursor-pointer">
            <ProfileMenu avator={user?.photo} />,
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
