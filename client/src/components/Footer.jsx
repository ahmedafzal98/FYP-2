import { useEffect, useState } from "react";

const Footer = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  const footerOptions = [
    "Help",
    "Status",
    "About",
    "Careers",
    "Press",
    "Blog",
    "Privacy",
    "Terms",
    "Text to speech",
    "Teams",
  ];
  const optionSmallDevices = ["About", "Help", "Terms", "Privacy"];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options = isSmallScreen ? optionSmallDevices : footerOptions;

  return (
    <footer className="flex flex-wrap items-center bg-header h-[69px] w-full fixed bottom-0">
      <div className="flex w-full sm:w-1/2 justify-evenly">
        <ul className="flex space-x-4">
          {options.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
