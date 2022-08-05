import { format } from "date-fns";

import {
  ClipboardText,
  Clock,
  DotsThreeOutlineVertical,
  SignOut,
} from "phosphor-react";
import { ResumePerfil } from "../components/ResumoPerfil";
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
import { useIsLarge, useIsSmall } from "../utils/mediaQueryHook";

import { motion } from "framer-motion";
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
  const isLarge = useIsLarge();
  const isSmall = useIsSmall();
  const [activeNavbar, setActiveNavbar] = useState(false);
  const { modalDeletePoint, modalEditPoint } = useContext(ContextModalProvider);
  const { selectedDate, dataTable } = useContext(ContextCalendarProvider);
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
  }

  useEffect(() => {
    if (!isSmall) {
      setActiveNavbar(false);
    }
  }, [isSmall]);

  return (
    <div className="flex flex-col">
      {modalEditPoint && <ModalEditPoint />}
      {modalDeletePoint && <ModalDeletePoint open={modalDeletePoint} />}

      {/* <NavMenu activeNavbar={activeNavbar} /> */}
      <div className="h-[60px] bg-blue-600 shadow-2xl flex items-center justify-between px-10">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <Clock size={32} />
            <h2 className="text-lg border-b">CPoints</h2>
          </div>

          <div className="hidden lg:flex items-center gap-6 border">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center border px-2 border-gray-600 bg-blue-800">
                <label className="text-sm text-gray-200">Entrada: </label>
                <span className="text-sm font-bold">
                  {user?.infoPoints?.entry}
                </span>
              </div>
              <div className="flex gap-2 items-center border px-2 border-gray-600 bg-blue-800">
                <label className="text-sm text-gray-200">Almoço: </label>
                <span className="text-sm font-bold">
                  {user?.infoPoints?.entryLunch} até{" "}
                  {user?.infoPoints?.exitLunch}
                </span>
              </div>
              <div className="flex gap-2 items-center border px-2 border-gray-600 bg-blue-800">
                <label className="text-sm text-gray-200">Saída: </label>
                <span className="text-sm font-bold">
                  {user?.infoPoints?.exit}
                </span>
              </div>
              <hr className="border" />
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
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 border-r pr-4">
            <img
              className="rounded-full"
              src="https://github.com/zagob.png"
              alt="Avatar"
              width={32}
              height={32}
            />
            <h3 className="">{user?.name}</h3>
            <DotsThreeOutlineVertical
              size={22}
              className="block lg:hidden transition-all hover:cursor-pointer hover:opacity-80"
            />
          </div>
          <SignOut
            size={32}
            className="transition-all hover:cursor-pointer hover:opacity-80"
          />
        </div>
        <div className={`block sm:hidden`}>
          <button
            className="grid grid-cols-1 gap-2"
            onClick={() => setActiveNavbar((oldState) => !oldState)}
          >
            <motion.div
              animate={
                activeNavbar ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.4 }}
              className="w-6 h-[2px] bg-white"
            ></motion.div>
            <motion.div
              animate={activeNavbar ? { opacity: 0 } : { rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="w-6 h-[2px] bg-white"
            ></motion.div>
            <motion.div
              animate={
                activeNavbar ? { rotate: -45, y: -10 } : { display: "block" }
              }
              className="w-6 h-[2px] bg-white"
            ></motion.div>
          </button>
        </div>
      </div>

      <motion.div
        initial={{ x: 2000 }}
        animate={activeNavbar ? { x: 100 } : { x: 2000 }}
        transition={{ duration: 0.4 }}
        className="absolute w-full h-[calc(100vh-60px)] mt-[60px] right-0 bg-blue-800 z-10 p-4"
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
                  {user?.infoPoints?.entryLunch} até{" "}
                  {user?.infoPoints?.exitLunch}
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
          />
        </div>
      </motion.div>

      <div className="flex flex-col gap-2 px-4 pt-2 h-[calc(100vh-60px)] relative">
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-20 bg-blue-600 rounded-lg shadow-2xl">
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
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </div>
        <div className="mb-2 flex-1 bg-blue-600 rounded-lg shadow-2xl">
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
