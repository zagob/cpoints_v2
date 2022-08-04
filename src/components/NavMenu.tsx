import { SignOut } from "phosphor-react";
import { useContext } from "react";
import { AuthContextProvider } from "../contexts/AuthContextProvider";

import { motion } from "framer-motion";
import { useIsLarge } from "../utils/mediaQueryHook";
import { ResumePerfil } from "./ResumoPerfil";

interface NavMenuProps {
  activeNavbar: boolean;
}

export function NavMenu({ activeNavbar }: NavMenuProps) {
  const isLarge = useIsLarge();

  const { onSignOut } = useContext(AuthContextProvider);

  console.log("isMedium", isLarge);
  console.log(activeNavbar);
  return (
    <motion.nav
      //   initial={{ width: "60px", display: "flex" }}
      animate={
        isLarge && !activeNavbar
          ? { x: -600, display: "flex", marginTop: "4rem" }
          : activeNavbar
          ? { width: "100%", display: "flex", marginTop: "4rem" }
          : { border: "1px solid red", x: 0, width: "60px" }
      }
      transition={{ duration: 0.4 }}
      className="
        h-full
        overflow-y-hidden
        bg-blue-600 
        shadow-2xl
        z-10
        absolute
        flex-col 
        items-center 
        justify-between 
        py-4"
    >
      <motion.div
        animate={
          isLarge && !activeNavbar
            ? { opacity: 0 }
            : activeNavbar
            ? { opacity: 1 }
            : {}
        }
        className="w-full px-2"
      >
        <ResumePerfil />
      </motion.div>
      <SignOut
        className="border border-transparent transition-all p-1 hover:border hover:border-gray-500 hover:cursor-pointer"
        size={40}
        onClick={onSignOut}
      />
    </motion.nav>
  );
}
