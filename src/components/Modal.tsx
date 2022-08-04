import { X } from "phosphor-react";
import { ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
}

export function Modal({ title, open, onClose, children }: ModalProps) {
  return (
    <>
      <div
        className={`justify-center items-center ${
          open ? "flex" : "hidden"
        } transition-all  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5">
              <h3 className="text-3xl text-gray-400 font-semibold">{title}</h3>
              <X
                size={22}
                onClick={onClose}
                className="hover:opacity-50 hover:cursor-pointer transition-all"
              />
            </div>
            <div className="relative p-6 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div
        className={`opacity-40 fixed inset-0 z-40 bg-black ${
          open ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
}
