import { useContext } from "react";
import { AuthContextProvider } from "../../contexts/AuthContextProvider";
import { ContextModalProvider } from "../../contexts/ContextModalProvider";
import { deleteDocPoints } from "../../services/firestore";
import { Button } from "../Button";
import toast from "react-hot-toast";
import { Modal } from "../Modal";

interface ModalDeletePointProps {
  open: boolean;
}

export function ModalDeletePoint({ open }: ModalDeletePointProps) {
  const { user } = useContext(AuthContextProvider);
  const { onCloseModalDeletePoint, idPoint } = useContext(ContextModalProvider);

  async function handleDeletePoint() {
    if (!user) {
      return;
    }

    await deleteDocPoints(user.id, idPoint);
    onCloseModalDeletePoint();
    toast.success("Excluido com sucesso!");
  }

  return (
    <Modal
      title="Deseja excluir?"
      open={open}
      onClose={onCloseModalDeletePoint}
    >
      <div className="flex gap-2 border-red-400 w-[300px]">
        <Button
          type="button"
          css="text-gray-900 bg-green-500 w-full"
          onClick={handleDeletePoint}
        >
          Sim
        </Button>
        <Button
          type="button"
          className="text-gray-100 w-full border rounded-md transition-all hover:bg-white hover:text-black"
          onClick={onCloseModalDeletePoint}
        >
          Não
        </Button>
      </div>
    </Modal>
  );
}
