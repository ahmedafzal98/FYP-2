import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SigninGoogleButton from "./SigninGoogleButton";

const AuthModal = ({ isOpen, closeModal }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black opacity-60" />
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md flex flex-col gap-2 items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    Join Smart News Hub
                  </Dialog.Title>
                  <div className="mt-4">
                    <SigninGoogleButton />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-center">
                      Click “Sign up” to agree to Smart News Hub’s Terms of
                      Service and acknowledge that Smart News Hub’s Privacy
                      Policy applies to you.
                    </p>
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

export default AuthModal;
