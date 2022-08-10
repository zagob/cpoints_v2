import type { NextPage } from "next";
import { Lock, User } from "phosphor-react";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import toast, { Toaster } from "react-hot-toast";

import * as yup from "yup";

import GoogleIcon from "../../public/assets/googleIcon.png";
import Image from "next/image";
import Link from "next/link";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import {
  sendEmailVerificationUser,
  signUserEmailAndPassword,
} from "../services/firebase";

type FormDataSubmit = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  })
  .required();

const Home: NextPage = () => {
  const { onSignWithGoogle, loadingUser, loadingSignIn } =
    useContext(AuthContextProvider);
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<FormDataSubmit>({
    resolver: yupResolver(schema),
  });

  async function handleSubmitSignIn(data: FormDataSubmit) {
    const user = await signUserEmailAndPassword(data.email, data.password);

    if (
      user === "auth/user-not-found" ||
      user === "auth/wrong-password" ||
      user === "auth/email-already-in-use"
    ) {
      return toast.error("E-mail ou Senha inválidos!");
    }

    if (!user.user.emailVerified) {
      return await sendEmailVerificationUser(user.user);
    }
  }

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen text-lg gap-2">
        <span className="animate-spin border-2 border-t-blue-500 border-l-blue-500 rounded-full w-6 h-6" />
        <span className="text-gray-200">Entrando...</span>
      </div>
    );
  }

  return (
    <div className="content">
      <Toaster />
      <div
        className="
        shadow-2xl 
        shadow-blue-800 
        border-cyan-900 
        border 
        rounded-[1.125rem] 
        lg:w-[500px]
        h-[400px] 
        flex 
        flex-col 
        items-center 
        p-8"
      >
        <h2 className="font-mono text-3xl">Login</h2>
        <form
          onSubmit={handleSubmit(handleSubmitSignIn)}
          className="h-full flex flex-col justify-center gap-2"
        >
          <Input
            icon={User}
            placeholder="E-mail"
            type="email"
            hasFilled={!!watch().email}
            isError={!!errors.email}
            messageError={errors.email?.message}
            register={{ ...register("email") }}
          />

          <Input
            icon={Lock}
            placeholder="Password"
            type="password"
            hasFilled={!!watch().password}
            isError={!!errors.password}
            messageError={errors.password?.message}
            register={{ ...register("password") }}
          />

          <Button color="green" type="submit">
            Entrar
          </Button>

          <button
            className="bg-white rounded-md py-1 transition-all disabled:opacity-40"
            type="button"
            onClick={onSignWithGoogle}
            disabled={loadingSignIn}
          >
            <div className="flex justify-center items-center gap-4">
              <Image
                width={40}
                height={40}
                src={GoogleIcon}
                alt="Logo do google"
                className="rounded"
              />
              {loadingSignIn ? (
                <div className="flex gap-4">
                  <span className="animate-pulse rounded-full w-2 h-2 bg-red-500 block"></span>
                  <span className="animate-pulse rounded-full w-2 h-2 bg-yellow-500 block"></span>
                  <span className="animate-pulse rounded-full w-2 h-2 bg-green-500 block"></span>
                  <span className="animate-pulse rounded-full w-2 h-2 bg-blue-500 block"></span>
                </div>
              ) : (
                <span className="font-bold text-gray-700">
                  Entrar com google
                </span>
              )}
            </div>
          </button>
        </form>
        <h4>
          Não é cadastrado?{" "}
          <Link href="/subscribe">
            <button className="border px-2 rounded transition-all hover:bg-blue-500 hover:border-transparent">
              <a>Inscreva-se</a>
            </button>
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Home;
