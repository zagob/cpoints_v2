import Image from "next/image";
import { format } from "date-fns";

import { PencilSimple, SignOut, User } from "phosphor-react";
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
import { parseCookies } from "nookies";
import { app, auth } from "../services/firebase";
import { getUser } from "../services/firestore";
import { getTimeDate } from "../utils/formatingTimeData";

interface SubmitFormProps {
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
  const { selectedDate } = useContext(ContextCalendarProvider);
  const { onSignOut } = useContext(AuthContextProvider);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubmitFormProps>({
    resolver: yupResolver(schema),
  });

  function handleSubmitForm(data: SubmitFormProps) {
    if (!selectedDate) {
      return;
    }

    const selectedDateString = format(selectedDate, "yyyy/MM/dd");
    const dataTime = { ...data, selectedDateString };
    console.log(dataTime);
    toast.success("Horas adicionadas com sucesso", {
      style: { background: "#333", color: "#fff" },
    });
    getTimeDate(dataTime);
    // reset();
  }

  return (
    <div className="flex">
      <nav className="w-[60px] h-screen bg-blue-600 shadow-2xl flex flex-col items-center justify-between py-4">
        <div>asd</div>
        <SignOut
          className="border border-transparent transition-all p-1 hover:border hover:border-gray-500 hover:cursor-pointer"
          size={40}
          onClick={onSignOut}
        />
      </nav>

      <div className="w-full flex flex-col gap-4 p-4">
        <div className="flex gap-4 h-[600px]">
          <div className="w-[500px] bg-blue-600 rounded-lg shadow-2xl">
            <ResumePerfil />
          </div>
          <div className="flex-1 bg-blue-600 rounded-lg shadow-2xl">
            <div className="flex justify-around items-center">
              <CalendarDayPicker />
              <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="flex flex-col gap-4 w-[300px]"
              >
                <div className="flex items-center w-full gap-4">
                  <div className="w-full">
                    <label
                      className={`${
                        !selectedDate && "opacity-40"
                      } transition-all duration-500`}
                      htmlFor="entry1"
                    >
                      Entrada 1:{" "}
                    </label>
                    <Input
                      type="time"
                      id="entry1"
                      placeholder="Entrada"
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
                      placeholder="Saida almoço"
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
                      placeholder="Entrada 2"
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
                      placeholder="Saída"
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
                <button type="button" className="bg-black" onClick={getUser}>
                  Teste
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="h-full bg-blue-600 rounded-lg shadow-2xl">
          <Table />
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
