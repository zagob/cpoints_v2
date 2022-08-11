import { format } from "date-fns";

import { ClipboardText } from "phosphor-react";
import { Table } from "../components/Table";

import { useContext, useEffect, useState } from "react";
import { CalendarDayPicker } from "../components/CalendarDayPicker";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContextCalendarProvider } from "../contexts/ContextCalendarProvider";

import toast, { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { addPointsHours, getPointsHours } from "../services/firestore";
import { getTimeDate } from "../utils/formatingTimeData";

import { ModalDeletePoint } from "../components/modals/ModalDeletePoint";
import { ContextModalProvider } from "../contexts/ContextModalProvider";
import { ModalEditPoint } from "../components/modals/ModalEditPoint";
import { NavMenu } from "../components/NavMenu";
import { useIsSmall } from "../utils/mediaQueryHook";

import { NavMenuMobile } from "../components/NavMenuMobile";
import { TimeBonus } from "../components/TimeBonus";
export interface SubmitFormProps {
  entry1: string;
  exit1: string;
  entry2: string;
  exit2: string;
}

const schema = yup
  .object({
    entry1: yup.string().required("Campo obrigatório"),
    exit1: yup.string().required("Campo obrigatório"),
    entry2: yup.string().required("Campo obrigatório"),
    exit2: yup.string().required("Campo obrigatório"),
  })
  .required();

export default function Dashboard() {
  const isSmall = useIsSmall();
  const [activeNavbar, setActiveNavbar] = useState(false);
  const { modalDeletePoint, modalEditPoint } = useContext(ContextModalProvider);
  const { selectedDate, dataTable, onResetSelectedDate } = useContext(
    ContextCalendarProvider
  );
  const { user } = useContext(AuthContextProvider);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubmitFormProps>({
    resolver: yupResolver(schema),
  });

  async function handleSubmitForm(data: SubmitFormProps) {
    if (!selectedDate || !user) {
      return;
    }

    const selectedDateString = format(selectedDate, "yyyy/MM/dd");

    const queryDoc = await getPointsHours(user?.id, selectedDateString);

    if (queryDoc.length > 0) {
      return toast.error("Já existe uma data cadastrada!", {
        style: { background: "#333", color: "#fff" },
      });
    }
    const dataTime = { ...data, selectedDateString };

    toast.success("Horas adicionadas com sucesso", {
      style: { background: "#333", color: "#fff" },
    });
    const result = getTimeDate(dataTime);
    await addPointsHours(result, user?.id);
    reset();
    onResetSelectedDate();
  }

  function onChangeActiveNavbar() {
    setActiveNavbar((old) => !old);
  }

  useEffect(() => {
    if (!isSmall) {
      setActiveNavbar(false);
    }
  }, [isSmall]);

  return (
    <div className="flex flex-col gap-4">
      {modalEditPoint && <ModalEditPoint />}
      {modalDeletePoint && <ModalDeletePoint open={modalDeletePoint} />}

      <NavMenu
        activeNavbar={activeNavbar}
        onChangeActiveNavbar={onChangeActiveNavbar}
      />

      <NavMenuMobile activeNavbar={activeNavbar} />

      <div
        className="flex items-stretch gap-6 h-[calc(100vh-60px)] mx-4 pb-10"
        // className={`flex flex-col gap-2 px-4 pt-2 h-[calc(100vh-60px)] overflow-x-hidden relative ${
        //   activeNavbar && "opacity-40"
        // }`}
        onClick={() => activeNavbar && setActiveNavbar(false)}
      >
        <div
          // className="flex flex-col lg:flex-row justify-center items-stretch pb-4 gap-2 lg:pb-0 lg:gap-20 bg-blue-600 rounded-lg shadow-2xl"
          className="
          flex 
          flex-col 
          lg:flex-col 
          justify-center
          items-center
          p-4
          bg-blue-600 
          rounded-lg 
          shadow-2xl
          "
        >
          <TimeBonus />
          <CalendarDayPicker />
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="flex flex-col justify-center gap-4 w-[300px]"
            >
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <label
                    className={`${
                      !selectedDate && "opacity-40"
                    } transition-all duration-500`}
                    htmlFor="entry1"
                  >
                    Entrada 1:
                  </label>
                  <Input
                    type="time"
                    id="entry1"
                    disabled={!selectedDate}
                    hasFilled={!!watch("entry1")}
                    isError={!!errors.entry1}
                    register={{ ...register("entry1") }}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Saída 1: </label>
                  <Input
                    type="time"
                    hasFilled={!!watch("exit1")}
                    isError={!!errors.exit1}
                    disabled={!!!watch("entry1")}
                    register={{ ...register("exit1") }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <label htmlFor="">Entrada 2: </label>
                  <Input
                    type="time"
                    hasFilled={!!watch("entry2")}
                    isError={!!errors.entry2}
                    disabled={!!!watch("exit1")}
                    register={{ ...register("entry2") }}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Saída 2: </label>
                  <Input
                    type="time"
                    hasFilled={!!watch("exit2")}
                    isError={!!errors.exit2}
                    disabled={!!!watch("entry2")}
                    register={{ ...register("exit2") }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  disabled={
                    !!!watch("entry1") ||
                    !!!watch("exit1") ||
                    !!!watch("entry2") ||
                    !!!watch("exit2") ||
                    !selectedDate
                  }
                  type="submit"
                  color="green"
                  css="flex-1"
                >
                  Cadastrar
                </Button>

                <Button
                  css="bg-purple-400 w-10"
                  title="Mais horários de entrada e saída"
                  type="button"
                  disabled={!!!watch("exit2")}
                >
                  +
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-blue-600 rounded-lg shadow-2xl overflow-x-auto">
          {dataTable.length > 0 ? (
            <Table data={dataTable} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center opacity-25">
              <h2 className="text-2xl">Nenhum dado cadastrado</h2>
              <ClipboardText size={100} />
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  // const cookies = parseCookies(ctx, {
  //   path: "/dashboard",
  // }).token;

  // if(cookies) {

  // }

  return {
    props: {},
  };
};
