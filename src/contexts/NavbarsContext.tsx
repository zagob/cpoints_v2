import { createContext, ReactNode, useState } from "react";

interface NavbarsContext {
  onActiveBarMenuForFalse: () => void;
  onActiveBarMenuForTrue: () => void;
  onActiveBarMenuInvertValueBoolean: () => void;
  activeNavbarMenu: boolean;
}

interface NavbarsProvider {
  children: ReactNode;
}

export const NavbarsContext = createContext({} as NavbarsContext);

export function NavbarsProvider({ children }: NavbarsProvider) {
  const [activeNavbarMenu, setActiveNavbarMenu] = useState(false);

  function onActiveBarMenuForFalse() {
    setActiveNavbarMenu(false);
  }

  function onActiveBarMenuForTrue() {
    setActiveNavbarMenu(true);
  }

  function onActiveBarMenuInvertValueBoolean() {
    setActiveNavbarMenu((old) => !old);
  }
  return (
    <NavbarsContext.Provider
      value={{
        activeNavbarMenu,
        onActiveBarMenuForFalse,
        onActiveBarMenuForTrue,
        onActiveBarMenuInvertValueBoolean,
      }}
    >
      {children}
    </NavbarsContext.Provider>
  );
}
