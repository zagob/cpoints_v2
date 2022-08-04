import Image, { ImageLoader, ImageProps } from "next/image";
import { PencilSimple, User } from "phosphor-react";
import { useContext } from "react";
import { AuthContextProvider } from "../contexts/AuthContextProvider";

export function ResumePerfil() {
  const { user } = useContext(AuthContextProvider);

  return (
    <div className="relative justify-around rounded-2xl shadow-lg shadow-blue-800 flex items-center flex-col gap-4 p-4 h-full">
      <h1 className="text-lg">Perfil</h1>
      <div className="flex items-center gap-8">
        <User className="rounded-full border-2" size={50} />

        <h2>{user?.name}</h2>
        <PencilSimple
          className="absolute top-2 right-2 transition-colors hover:text-blue-400 hover:cursor-pointer"
          weight="fill"
          size={22}
        />
      </div>

      <div className=" rounded-lg shadow-2xl py-4 w-full flex justify-around items-center">
        <div>
          <label className="text-gray-400">Total horas</label>
          <span className="block text-gray-300">
            {user?.infoPoints?.totalHoursWork}
          </span>
        </div>
        <div>
          <label className="text-gray-400">Entrada</label>
          <span className="block text-gray-300">{user?.infoPoints?.entry}</span>
        </div>
        <div>
          <label className="text-gray-400">Almoço</label>
          <span className="block text-gray-300">
            {user?.infoPoints?.entryLunch} até {user?.infoPoints?.exitLunch}
          </span>
        </div>
        <div>
          <label className="text-gray-400">Saída</label>
          <span className="block text-gray-300">{user?.infoPoints?.exit}</span>
        </div>
      </div>

      {/* <div className="w-full">
        <span>
          Banco Horas: <strong>-09:32</strong>
        </span>
      </div> */}
    </div>
  );
}
