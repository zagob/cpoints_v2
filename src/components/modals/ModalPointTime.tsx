import { useContext } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { ContextModalProvider } from "../../contexts/ContextModalProvider";
import { toast } from "react-hot-toast";
import { getTimeDate } from "../../utils/formatingTimeData";
import { Button } from "../Button";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { AuthContextProvider } from "../../contexts/AuthContextProvider";
import { updateDocPoints } from "../../services/firestore";
import { ptBR } from "date-fns/locale";
import { Trash } from "phosphor-react";

interface SubmitFormItemProps {
  entry1: string;
  exit1: string;
  entry2: string;
  exit2: string;
}

export function ModalPointTime() {
  const { user } = useContext(AuthContextProvider);
  const {
    modalPointTime,
    modalDeletePoint,
    onCloseModalPointTime,
    itemPoint,
    onOpenDeleteModalPoint,
  } = useContext(ContextModalProvider);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitFormItemProps>({
    defaultValues: {
      entry1: itemPoint.entry1,
      exit1: itemPoint.exit1,
      entry2: itemPoint.entry2,
      exit2: itemPoint.exit2,
    },
  });

  async function handleEditPoint(data: SubmitFormItemProps) {
    if (!user || !itemPoint.selectedDateString) {
      return;
    }

    const selectedDateString = format(
      itemPoint.selectedDateString,
      "yyyy/MM/dd"
    );

    const dataTime = { ...data, selectedDateString };
    const result = getTimeDate(dataTime);
    await updateDocPoints(user.id, itemPoint.id, result);

    toast.success("Horário atualizado com sucesso!");
  }

  return (
    <>
      <Modal
        title={`Time Point: ${
          itemPoint?.selectedDateString
            ? format(new Date(itemPoint.selectedDateString), "dd/MM '-' cccc", {
                locale: ptBR,
              })
            : ""
        }`}
        open={modalPointTime}
        onClose={onCloseModalPointTime}
      >
        <div
          className={`flex flex-col gap-4 w-[280px] ${
            modalDeletePoint && "opacity-30"
          }`}
        >
          <div></div>
          <form
            onSubmit={handleSubmit(handleEditPoint)}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4">
              <div className="w-full">
                <label>Entrada1:</label>
                <Input
                  type="time"
                  hasFilled={!!watch("entry1")}
                  isError={!!errors.entry1}
                  register={{ ...register("entry1") }}
                />
              </div>
              <div className="w-full">
                <label>Saída1:</label>
                <Input
                  type="time"
                  register={{ ...register("exit1") }}
                  disabled={!!!watch("entry1")}
                  isError={!!errors.exit1}
                  hasFilled={!!watch("exit1")}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <label>Entrada2:</label>
                <Input
                  type="time"
                  register={{ ...register("entry2") }}
                  disabled={!!!watch("exit1")}
                  isError={!!errors.entry2}
                  hasFilled={!!watch("entry2")}
                />
              </div>
              <div className="w-full">
                <label>Saída2:</label>
                <Input
                  type="time"
                  register={{ ...register("exit2") }}
                  disabled={!!!watch("entry2")}
                  isError={!!errors.exit2}
                  hasFilled={!!watch("exit2")}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                css="flex-1"
                type="submit"
                color="green"
                disabled={
                  !!!watch("entry1") ||
                  !!!watch("exit1") ||
                  !!!watch("entry2") ||
                  !!!watch("exit2")
                }
              >
                Atualizar
              </Button>
              <Button
                css="w-10"
                title="Adicionar horários"
                type="button"
                color="white"
                onClick={onCloseModalPointTime}
              >
                +
              </Button>
            </div>
          </form>
          <Button
            type="button"
            css="flex items-center justify-center gap-2 w-full"
            color="red"
            onClick={() => onOpenDeleteModalPoint(itemPoint.id)}
          >
            <Trash size={22} />
            Apagar Horário
          </Button>
        </div>
      </Modal>
    </>
  );
}
