import ActionButton from "./ActionButton";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navOptions = [
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
          <Link to="/about">
            <span className="hidden lg:block cursor-pointer">About Us </span>
          </Link>
          <Link to="/contact">
            <span className="hidden lg:block cursor-pointer">Contact Us </span>
          </Link>
          {navOptions.map((item, ind) => {
            return (
              <ul key={ind}>
                <a onClick={() => setIsOpenModal(true)}>
                  <li className="flex text-black cursor-pointer">{item}</li>
                </a>
              </ul>
            );
          })}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
