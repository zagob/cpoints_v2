import {
  Clock,
  DotsThreeOutlineVertical,
  SignOut,
  UserCircle,
} from "phosphor-react";
import { useContext } from "react";
import { AuthContextProvider } from "../contexts/AuthContextProvider";

import { motion } from "framer-motion";

interface NavMenuProps {
  activeNavbar: boolean;
  onChangeActiveNavbar: () => void;
}

export function NavMenu({ activeNavbar, onChangeActiveNavbar }: NavMenuProps) {
  const { user, onSignOut } = useContext(AuthContextProvider);

  return (
    <div className="h-[60px] bg-blue-600 shadow-2xl flex items-center justify-between px-10">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <Clock size={32} />
          <h2 className="text-lg border-b">CPoints</h2>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center border px-2 border-gray-600 bg-blue-800">
              <label className="text-sm text-gray-200">Entrada: </label>
              <span className="text-sm font-bold">
                {user?.infoPoints?.entry}
              </span>
            </div>
            <div className="flex gap-2 items-center border px-2 border-gray-600 bg-blue-800">
              <label className="text-sm text-gray-200">Almoço: </label>
              <span className="text-sm font-bold">
                {user?.infoPoints?.entryLunch} até {user?.infoPoints?.exitLunch}
              </span>
            </div>
            <div className="flex gap-2 items-center border px-2 border-gray-600 bg-blue-800">
              <label className="text-sm text-gray-200">Saída: </label>
              <span className="text-sm font-bold">
                {user?.infoPoints?.exit}
              </span>
            </div>
            <hr className="border" />
            <div className="flex gap-2 items-center border px-2 border-gray-600 bg-blue-800">
              <label className="text-sm text-gray-200">
                Total Horas por dia:{" "}
              </label>
              <span className="text-sm font-bold">
                {user?.infoPoints?.totalHoursWork}h
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex items-center gap-2 border-r pr-4">
          <UserCircle size={32} />
          <h3 className="">{user?.name}</h3>
          <DotsThreeOutlineVertical
            size={22}
            className="block lg:hidden transition-all hover:cursor-pointer hover:opacity-80"
          />
        </div>
        <SignOut
          size={32}
          className="transition-all hover:cursor-pointer hover:opacity-80"
          onClick={onSignOut}
        />
      </div>
      <div className={`block sm:hidden`}>
        <button
          className="grid grid-cols-1 gap-2"
          onClick={onChangeActiveNavbar}
        >
          <motion.div
            animate={activeNavbar ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-6 h-[2px] bg-white"
          ></motion.div>
          <motion.div
            animate={activeNavbar ? { opacity: 0 } : { rotate: 0 }}
            transition={{ duration: 0.4 }}
            className="w-6 h-[2px] bg-white"
          ></motion.div>
          <motion.div
            animate={
              activeNavbar ? { rotate: -45, y: -10 } : { display: "block" }
            }
            className="w-6 h-[2px] bg-white"
          ></motion.div>
        </button>
      </div>
    </div>
  );
}
