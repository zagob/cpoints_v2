import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { addInfoPoints } from "../services/firestore";

export interface SubmitFormProps {
  entry: string;
  entryLunch: string;
  exitLunch: string;
  exit: string;
  totalHoursWork: string;
}

export default function Profile() {
  const { user, onSignOut, addInfoPointsToUser } =
    useContext(AuthContextProvider);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmitFormProps>();

  async function handleSubmitForm(data: SubmitFormProps) {
    if (!user) {
      return;
    }

    await addInfoPoints(data, user.id);
    addInfoPointsToUser(data);

    router.push("/dashboard");
  }

  return (
    <div className="content">
      <div className="w-[250px]">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between gap-4">
            <div>
              <label htmlFor="">Entrada:</label>
              <Input
                type="time"
                id="entry"
                register={{ ...register("entry") }}
              />
            </div>
            <div>
              <label htmlFor="">Entrada Almoço:</label>
              <Input
                type="time"
                id="entryLunch"
                register={{ ...register("entryLunch") }}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div>
              <label htmlFor="">Saída Almoço:</label>
              <Input
                type="time"
                id="exitLunch"
                register={{ ...register("exitLunch") }}
              />
            </div>
            <div>
              <label htmlFor="">Saída:</label>
              <Input type="time" id="exit" register={{ ...register("exit") }} />
            </div>
          </div>

          <div>
            <label htmlFor="">Total Horas:</label>
            <Input
              type="number"
              id="totalHoursWork"
              register={{ ...register("totalHoursWork") }}
            />
          </div>

          <Button
            disabled={
              !!!watch("entry") ||
              !!!watch("entryLunch") ||
              !!!watch("exitLunch") ||
              !!!watch("exit") ||
              !!!watch("totalHoursWork")
            }
            type="submit"
            color="green"
          >
            Enviar
          </Button>
          <Button onClick={onSignOut} type="button">
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  );
}
