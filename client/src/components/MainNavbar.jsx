import { Bell, Ellipsis, PenBoxIcon, Search, TagIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Seperator from "../components/Sepeartor";
import { Link, Outlet, useLocation } from "react-router";
import { setTriggerSubmit } from "../store/features/ArticleEditorSlice";
import { useCallback, useEffect, useState } from "react";
import lodash from "lodash";
import SearchPopover from "./SearchPopover";

const MainNavbar = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // console.log("user", user);

  const handleSubmitClick = () => {
    dispatch(setTriggerSubmit(true));
  };

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BASE_URL
        }/api/articles/search?q=${searchQuery}`;

        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        setSearchResult(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    const debounceSearch = lodash.debounce(() => {
      fetchSearchResult();
    }, 500);

    if (searchQuery) {
      debounceSearch();
    }
    return () => {
      debounceSearch.cancel();
    };
  }, [searchQuery]);

  if (location.pathname === "/writeArticle") {
    return (
      <>
        <nav className="text-black h-15 flex items-center justify-between overflow-hidden">
          <div className="flex gap-3 items-center">
            <div className="text-normal ml-6 sm:text-3xl text-black flex">
              <span>SmartNewsHub</span>
            </div>
            <div className="h-11 w-50 sm:w-60 flex items-center pl-4 gap-4">
              <span>
                Draft in{" "}
                <span dangerouslySetInnerHTML={{ __html: user.name }}></span>
              </span>
              <span className="text-black opacity-60">Saved</span>
            </div>
          </div>
          <div className="w-2xl justify-center flex mr-7 gap-8 items-center">
            <div
              onClick={handleSubmitClick}
              className="bg-green-500 cursor-pointer w-[74px] flex items-center hover:opacity-70 justify-center h-[36px] rounded-3xl p-2"
            >
              <span className="text-white">Publish</span>
            </div>

            <Ellipsis strokeWidth={1} className="cursor-pointer" />
            <Bell strokeWidth={1} className="cursor-pointer" />

            <div className="h-8 w-8 cursor-pointer">
              <img
                src={user.photoUrl}
                alt="User photo"
                className="rounded-full"
              />
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
          <div className="flex flex-col">
            <div className="h-11 bg-[#F9F9F9] w-50 sm:w-60 rounded-3xl flex items-center pl-4 gap-4">
              <Search strokeWidth={1} />
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="focus:outline-none focus:border-none w-full"
              />
            </div>
            {searchQuery &&
              searchResult &&
              searchResult.map((item) => {
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
        <div className="flex mr-7 gap-8 items-center">
          <Link to="/writeArticle">
            <div className="flex gap-1 cursor-pointer ">
              <PenBoxIcon strokeWidth={1} />
              <span>Write</span>
            </div>
          </Link>

          <Bell strokeWidth={1} className="cursor-pointer" />

          <div className="h-8 w-8 cursor-pointer">
            <img
              src={user && user.photoUrl}
              alt="User photo"
              className="rounded-full"
            />
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
