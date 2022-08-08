import { motion } from "framer-motion";
import { SignOut } from "phosphor-react";
import { useContext } from "react";
import { AuthContextProvider } from "../contexts/AuthContextProvider";

interface NavMenuMobileProps {
  activeNavbar: boolean;
}

export function NavMenuMobile({ activeNavbar }: NavMenuMobileProps) {
  const { user, onSignOut } = useContext(AuthContextProvider);

  return (
    <motion.div
      initial={{ x: 2000 }}
      animate={activeNavbar ? { x: 100 } : { x: 2000 }}
      transition={{ duration: 0.4 }}
      className="absolute w-full h-[calc(100vh-60px)] mt-[60px] right-0 z-10 p-4 bg-blue-800"
    >
      <div className="flex flex-col h-full justify-between gap-2">
        <div>
          <div className="flex items-center justify-start gap-2">
            <img
              className="rounded-full"
              src="https://github.com/zagob.png"
              alt="Avatar"
              width={32}
              height={32}
            />
            <h3 className="">{user?.name}</h3>
          </div>
          <div className="flex flex-col items-start gap-4 mt-8">
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
        <SignOut
          size={32}
          className="transition-all hover:cursor-pointer hover:opacity-80"
          onClick={onSignOut}
        />
      </div>
    </motion.div>
  );
}
