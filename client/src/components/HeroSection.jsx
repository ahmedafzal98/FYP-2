import { useState } from "react";
import ActionButton from "./ActionButton";
import AuthModal from "./AuthModal";
import Seperator from "./Sepeartor";

const HeroSection = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <AuthModal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
      />
      <Seperator />
      <main className="relative bg-banner flex justify-between items-center h-[81vh]">
        <div className="ml-12">
          <h2 className="text-[80px] sm:text-[120px] font-serif leading-none">
            Human <br /> stories & ideas
          </h2>
          <h2 className="text-[22px] mt-10 font-normal">
            A place to read, write, and deepen your understanding
          </h2>
          <div className="mt-20">
            <ActionButton
              title="Start reading"
              width="196"
              height="46"
              fontSize="20"
              onClick={() => setIsOpenModal(true)}
            />
          </div>
        </div>
        <img
          className="hidden sm:flex mr-10"
          src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
          alt=""
          width={450}
          height={600}
        />
      </main>
    </>
  );
};
export default HeroSection;
