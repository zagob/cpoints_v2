import { useContext } from "react";
import { Button } from "../components/Button";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { sendEmailVerificationUser } from "../services/firebase";

export default function VerifyEmail() {
  const { onSignOut, user } = useContext(AuthContextProvider);

  async function handleSendEmailVerify() {
    await sendEmailVerificationUser(user);
  }

  return (
    <div className="content">
      <div className="border p-10 border-gray-600 rounded-lg">
        <h1 className="text-green-500 font-bold text-3xl">
          Verifique seu email
        </h1>
        <div className="flex justify-center gap-4 mt-4">
          <Button type="button" color="green" onClick={onSignOut}>
            Enviar Novamente
          </Button>
          <Button type="button" color="white" onClick={onSignOut}>
            Voltar
          </Button>
          {/* <Button type="button" onClick={onSignOut}>
            Cancelar
          </Button> */}
        </div>
      </div>
    </div>
  );
}
