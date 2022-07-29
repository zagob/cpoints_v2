import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Lock, User } from "phosphor-react";
import Link from "next/link";

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
    control,
    formState: { errors },
  } = useForm<FormDataSubmit>({
    resolver: yupResolver(schema),
  });

  function handleSubmitSignIn(data: FormDataSubmit) {
    console.log(errors);
    console.log(data);
  }
  return (
    <div className="content">
      <div className="shadow-2xl shadow-blue-800 border-cyan-900 rounded-[1.125rem] w-[500px] h-[400px] border flex flex-col items-center p-8">
        <h2 className="font-mono text-3xl">Cadastro</h2>
        <form
          onSubmit={handleSubmit(handleSubmitSignIn)}
          className="h-full flex flex-col justify-center gap-2"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                icon={User}
                placeholder="Nome"
                type="text"
                hasFilled={!!watch().name}
                isError={!!errors.name}
                messageError={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                icon={User}
                placeholder="E-mail"
                type="email"
                hasFilled={!!watch().email}
                isError={!!errors.email}
                messageError={errors.email?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                icon={Lock}
                placeholder="Password"
                type="password"
                hasFilled={!!watch().password}
                isError={!!errors.password}
                messageError={errors.password?.message}
                {...field}
              />
            )}
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
