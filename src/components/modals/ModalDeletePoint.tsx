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
        <button
          type="button"
          className="text-gray-900 bg-green-500 w-full py-2 text-lg transition-all hover:brightness-90"
          onClick={handleDeletePoint}
        >
          Sim
        </button>
        <button
          type="button"
          className="text-gray-100 w-full py-2 text-lg border transition-all hover:brightness-90"
          onClick={onCloseModalDeletePoint}
        >
          Não
        </button>
      </div>
    </Modal>
  );
}
