import { format } from "date-fns";

import { ClipboardText, List, SignOut } from "phosphor-react";
import { ResumePerfil } from "../components/ResumoPerfil";
import { Table } from "../components/Table";

import { useContext, useState } from "react";
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
import { Modal } from "../components/Modal";
import { ModalDeletePoint } from "../components/modals/ModalDeletePoint";
import { ContextModalProvider } from "../contexts/ContextModalProvider";
import { ModalEditPoint } from "../components/modals/ModalEditPoint";
import { NavMenu } from "../components/NavMenu";
import { useIsLarge } from "../utils/mediaQueryHook";

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

  return (
    <div className="flex">
      {modalEditPoint && <ModalEditPoint />}
      {modalDeletePoint && <ModalDeletePoint open={modalDeletePoint} />}

      <NavMenu activeNavbar={activeNavbar} />
      <motion.div
        animate={!isLarge ? { marginLeft: "2.5rem" } : {}}
        transition={{ duration: 0.4 }}
        className="flex-1 grid gap-4 p-4 relative"
      >
        <div className={`flex lg:hidden`}>
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
              animate={activeNavbar ? { display: "none" } : { rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="w-6 h-[2px] bg-white"
            ></motion.div>
            <motion.div
              animate={activeNavbar ? { rotate: -45 } : { display: "block" }}
              className="w-6 h-[2px] bg-white"
            ></motion.div>
          </button>
          {/* <List
            className={`transition-all z-10 hover:cursor-pointer hover:opacity-75`}
            size={32}
            onClick={() => setActiveNavbar((oldState) => !oldState)}
          /> */}
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="bg-blue-600 rounded-lg shadow-2xl col-span-5 hidden lg:block">
            <ResumePerfil />
          </div>
          <div
            className="
            bg-blue-600
            rounded-lg 
            shadow-2xl 
            col-span-full
            flex-col
            py-4
            md:p-0
            items-center
            justify-center
            md:flex
            md:justify-around
            md:flex-row
            lg:flex-row
            lg:col-span-7  
            "
          >
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
                    <label htmlFor="">Saída: </label>
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
                    <label htmlFor="">Saída: </label>
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
        </div>
        <div className="bg-blue-600 rounded-lg shadow-2xl overflow-hidden">
          {dataTable.length > 0 ? (
            <Table data={dataTable} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-25">
              <h2 className="text-2xl">Nenhum dado cadastrado</h2>
              <ClipboardText size={100} />
            </div>
          )}
        </div>
      </motion.div>
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
