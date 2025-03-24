import ActionButton from "./ActionButton";

const Navbar = () => {
  const navOptions = [
    <span className="hidden md:block">Our Story</span>,
    <span className="hidden md:block">Membership</span>,
    <span className="hidden md:block">Write</span>,
    <span className="hidden md:block">Sign in</span>,
    <ActionButton
      title="Get started"
      width="104"
      height="38"
      className="block md:hidden"
    />,
  ];

  return (
    <nav className="flex w-[100%] h-[76px] bg-header items-center justify-between">
      <div className="text-2xl ml-12 sm:text-3xl text-black">SmartNewsHub</div>
      <div className="flex items-center justify-evenly w-1/3">
        {navOptions.map((item) => {
          return (
            <>
              <ul className="">
                <a href="">
                  <li className="flex text-black">{item}</li>
                </a>
              </ul>
            </>
          );
        })}
      </div>
    </nav>
  );
};
export default Navbar;
