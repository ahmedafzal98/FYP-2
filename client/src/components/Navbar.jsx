import ActionButton from "./ActionButton";
import AuthModal from "../components/AuthModal";
import { useState } from "react";

const Navbar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navOptions = [
    <span className="hidden lg:block">Our Story</span>,
    <span className="hidden lg:block">Membership</span>,
    <span className="hidden lg:block">Write</span>,
    <span className="hidden lg:block">Sign in</span>,
    <ActionButton
      title="Get started"
      width="104"
      height="38"
      className="block md:hidden"
    />,
  ];

  return (
    <>
      <AuthModal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
      />
      <nav className="flex w-[100%] h-[76px] bg-header items-center justify-between">
        <div className="text-2xl ml-12 sm:text-3xl text-black">
          SmartNewsHub
        </div>
        <div className="flex items-center justify-evenly w-1/3">
          {navOptions.map((item) => {
            return (
              <>
                <ul>
                  <a onClick={() => setIsOpenModal(true)}>
                    <li className="flex text-black cursor-pointer">{item}</li>
                  </a>
                </ul>
              </>
            );
          })}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
