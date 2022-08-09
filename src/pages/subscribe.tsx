import { useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Lock, User } from "phosphor-react";
import Link from "next/link";
import {
  createUserEmail,
  sendEmailVerificationUser,
} from "../services/firebase";

import toast, { Toaster } from "react-hot-toast";
import { createUser } from "../services/firestore";

type FormDataSubmit = {
  name: string;
  email: string;
  password: string;
};

const schema = yup
  .object({
    name: yup.string().required("Nome obrigatória"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  })
  .required();

export default function Subscribe() {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<FormDataSubmit>({
    resolver: yupResolver(schema),
  });

  async function handleSubmitSignIn(data: FormDataSubmit) {
    const user = await createUserEmail(data.email, data.password);
    if (user === "auth/email-already-in-use") {
      return toast.error("E-mail já existente");
    }
    await sendEmailVerificationUser(user.user);

    const { email, emailVerified, photoURL, uid } = user.user;

    await createUser(data.name, emailVerified, email, photoURL, uid);
    toast.success("Conta criada com sucesso! verifique seu email para ativar");
  }

  return (
    <div className="content">
      <Toaster />
      <div className="shadow-2xl shadow-blue-800 border-cyan-900 rounded-[1.125rem] lg:w-[500px] h-[400px] border flex flex-col items-center p-8">
        <h2 className="font-mono text-3xl">Cadastro</h2>
        <form
          onSubmit={handleSubmit(handleSubmitSignIn)}
          className="h-full flex flex-col justify-center gap-2"
        >
          <Input
            icon={User}
            placeholder="Name"
            type="text"
            hasFilled={!!watch().name}
            isError={!!errors.name}
            messageError={errors.name?.message}
            register={{ ...register("name") }}
          />
          <Input
            icon={User}
            placeholder="Email"
            type="text"
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
            Cadastrar
          </Button>
        </form>
        <Link href="/">
          <button className="border px-2 rounded transition-all hover:bg-blue-500 hover:border-transparent">
            <a>Fazer Login</a>
          </button>
        </Link>
      </div>
    </div>
  );
}
