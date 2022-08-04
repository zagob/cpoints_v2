import { createContext, ReactNode, useState } from "react";

interface ModalEditProps {
  id: string;
  entry1: string;
  exit1: string;
  entry2: string;
  exit2: string;
  selectedDateString: Date | undefined;
}

interface ContextModalProviderProps {
  modalDeletePoint: boolean;
  modalEditPoint: boolean;
  itemPoint: ModalEditProps;
  idPoint: string;
  onCloseModalDeletePoint: () => void;
  onCloseModalEditPoint: () => void;
  onOpenDeleteModalPoint: (id: string) => void;
  onOpenEditModalPoint: (data: ModalEditProps) => void;
}

export const ContextModalProvider = createContext(
  {} as ContextModalProviderProps
);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalDeletePoint, setModalDeletePoint] = useState(false);
  const [modalEditPoint, setModalEditPoint] = useState(false);
  const [idPoint, setIdPoint] = useState("");
  const [itemPoint, setItemPoint] = useState({} as ModalEditProps);

  function onCloseModalDeletePoint() {
    setModalDeletePoint(false);
  }

  function onCloseModalEditPoint() {
    setModalEditPoint(false);
  }

  function onOpenDeleteModalPoint(id: string) {
    setModalDeletePoint(true);
    setIdPoint(id);
  }

  function onOpenEditModalPoint(data: ModalEditProps) {
    setModalEditPoint(true);
    setItemPoint(data);
  }

  return (
    <ContextModalProvider.Provider
      value={{
        modalDeletePoint,
        modalEditPoint,
        itemPoint,
        idPoint,
        onCloseModalDeletePoint,
        onOpenDeleteModalPoint,
        onCloseModalEditPoint,
        onOpenEditModalPoint,
      }}
    >
      {children}
    </ContextModalProvider.Provider>
  );
}
