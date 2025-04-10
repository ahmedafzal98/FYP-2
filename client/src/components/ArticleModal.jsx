import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import MultiSelect from "./MultiSelect";
import ActionButton from "../components/ActionButton";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";

const ArticleModal = ({ isOpen, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate;

  const { triggerSubmit, title, content, tags } = useSelector(
    (state) => state.articleEditor
  );
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const handleArticleSubmit = async () => {
    setIsLoading(true);
    const API_URL = import.meta.env.VITE_BASE_URL;
    const url = `${API_URL}/api/articles`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tags,
          author: user.name,
          authorImageUrl: user.photoUrl,
        }),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
      navigate("/articles");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting article:", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-40" />

          {/* Overlay fade transition */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          {/* Modal */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-[80vw] h-[80vh] max-w-[80vw] max-h-[80vh] bg-[#f2f2f2] p-8 text-left rounded-3xl shadow-xl transition-all flex flex-col justify-start">
                  {/* Close button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-transform transform hover:scale-110"
                  >
                    <X size={30} />
                  </button>

                  <div className="mt-[10%] flex flex-col items-center justify-center">
                    <Dialog.Title className="text-3xl font-semibold leading-6 text-gray-900 mb-6">
                      <span className="font-light">Publishing to: </span>
                      <strong>{user.name}</strong>
                    </Dialog.Title>

                    <div className="mt-4">
                      <p className="text-sm text-gray-600 text-center mb-6">
                        Add or change topics (up to 5) so readers know what your
                        story is about.
                      </p>
                    </div>

                    <div className="mt-6 flex w-full justify-center">
                      <MultiSelect />
                    </div>

                    <div
                      onClick={handleArticleSubmit}
                      className="cursor-pointer hover:opacity-70 mt-8 flex justify-center w-[10%] h-10 items-center bg-green-400 rounded-3xl"
                    >
                      <span className="text-white">Publish now</span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ArticleModal;
