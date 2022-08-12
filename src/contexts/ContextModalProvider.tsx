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
  modalPointTime: boolean;
  itemPoint: ModalEditProps;
  idPoint: string;
  onCloseModalDeletePoint: () => void;
  onOpenDeleteModalPoint: (id: string) => void;
  onCloseModalPointTime: () => void;
  onOpenModalPointTime: (data: ModalEditProps) => void;
}

export const ContextModalProvider = createContext(
  {} as ContextModalProviderProps
);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalDeletePoint, setModalDeletePoint] = useState(false);
  const [modalPointTime, setModalPointTime] = useState(false);
  const [idPoint, setIdPoint] = useState("");
  const [itemPoint, setItemPoint] = useState({} as ModalEditProps);

  function onCloseModalPointTime() {
    setModalPointTime(false);
  }

  function onOpenModalPointTime(data: ModalEditProps) {
    setModalPointTime(true);
    setItemPoint(data);
  }

  function onCloseModalDeletePoint() {
    setModalDeletePoint(false);
  }

  function onOpenDeleteModalPoint(id: string) {
    setModalDeletePoint(true);
    setIdPoint(id);
  }

  return (
    <ContextModalProvider.Provider
      value={{
        modalDeletePoint,
        itemPoint,
        idPoint,
        onCloseModalDeletePoint,
        onOpenDeleteModalPoint,
        modalPointTime,
        onCloseModalPointTime,
        onOpenModalPointTime,
      }}
    >
      {children}
    </ContextModalProvider.Provider>
  );
}
