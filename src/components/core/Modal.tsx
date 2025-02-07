import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

export default function Modal({
  children,
  className = "",
  isOpen,
  setIsOpen,
  fullWidth = false,
}: {
  children: any;
  className?: string;
  isOpen?: any;
  setIsOpen?: any;
  fullWidth?: any;
}) {
  return (
    <>
      <Transition
        appear
        show={isOpen}
        enter="duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={setIsOpen}
        >
          <div className="bg-black-400/75 transition-ease fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
              className={twMerge(
                fullWidth
                  ? "pt-10 sm:pt-20"
                  : "items-end justify-center p-4 max-sm:px-0 max-sm:pb-0 max-sm:pt-10 sm:items-center",
                "flex min-h-full",
              )}
            >
              <TransitionChild
                enter={twMerge(
                  fullWidth
                    ? "transform transition-ease"
                    : "max-sm:transform max-sm:transition max-sm:ease-in-out",
                )}
                enterFrom={twMerge(
                  fullWidth
                    ? "translate-y-full"
                    : "max-sm:translate-y-full sm:opacity-0",
                )}
                enterTo={twMerge(
                  fullWidth
                    ? "translate-y-0"
                    : "max-sm:translate-y-0 sm:opacity-100",
                )}
                leave={twMerge(
                  fullWidth
                    ? "transform transition-ease"
                    : "transform transition-ease",
                )}
                leaveFrom={twMerge(
                  fullWidth
                    ? "translate-y-0"
                    : "max-sm:translate-y-0 sm:opacity-100",
                )}
                leaveTo={twMerge(
                  fullWidth
                    ? "translate-y-full"
                    : "max-sm:translate-y-full sm:opacity-0",
                )}
              >
                <DialogPanel
                  className={`${
                    fullWidth
                      ? "max-w-full rounded-lg rounded-b-none"
                      : "max-w-full rounded-lg max-sm:rounded-b-none sm:max-w-[460px]"
                  } border-tertiary-background overflow-clipss relative w-full border bg-blue-800 px-4 py-10 sm:px-10 sm:py-12 ${className}`}
                >
                  <button
                    className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <XMarkIcon className="text-secondary-text size-6 sm:size-8" />
                  </button>
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
