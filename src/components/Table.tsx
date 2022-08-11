import { format } from "date-fns";
import ptBr from "date-fns/locale/pt";
import { ClipboardText, Eraser, Trash } from "phosphor-react";
import { useContext } from "react";
import { DataTableProps } from "../contexts/ContextCalendarProvider";
import { ContextModalProvider } from "../contexts/ContextModalProvider";
import { useMediaQuery } from "../hooks/useMedidaQuery";
import { formatDataTime } from "../utils/dateFnsFormatHours";
import { useIsLarge, useIsMedium } from "../utils/mediaQueryHook";

import { motion } from "framer-motion";

interface TableProps {
  data: DataTableProps[];
}

export function Table({ data }: TableProps) {
  const isLarge = useIsLarge();
  const { onOpenDeleteModalPoint, onOpenEditModalPoint } =
    useContext(ContextModalProvider);

  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative table-auto rounded-md shadow-2xl bg-blue-600 h-full overflow-y-auto overflow-x-auto"
    >
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase text-gray-400 w-full">
          <tr>
            <th className="py-3 px-6 sticky top-0 bg-gray-700 z-10 ">Data</th>
            <th className="py-3 px-6 top-0 bg-gray-700 z-10 hidden lg:table-cell lg:sticky">
              Entrada
            </th>
            <th className="py-3 px-6 top-0 bg-gray-700 z-10 hidden lg:table-cell lg:sticky">
              Almoço
            </th>
            <th className="py-3 px-6 top-0 bg-gray-700 z-10 hidden lg:table-cell lg:sticky">
              Saída
            </th>
            <th className="py-3 px-6 top-0 sticky bg-gray-700 z-10">Bonús</th>
            <th className="py-3 px-6 top-0 sticky bg-gray-700 z-10">Total</th>
            <th className="py-3 px-6 top-0 sticky bg-gray-700 z-10 w-20">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b bg-gray-800 border-gray-700 hover:cursor-pointer hover:brightness-90"
            >
              <td className="py-2 px-6 font-medium  whitespace-nowrap text-white w-[20%]">
                {isLarge ? (
                  <>
                    {format(new Date(item.selectedDateString!), `dd/MM`, {
                      locale: ptBr,
                    })}
                  </>
                ) : (
                  <>
                    {format(
                      new Date(item.selectedDateString!),
                      `dd 'de' MMMM, cccc`,
                      {
                        locale: ptBr,
                      }
                    )}
                  </>
                )}
              </td>
              <td className="py-1 px-6 w-[10%] hidden lg:table-cell">
                {item.entry1}
              </td>
              <td className="py-1 px-6 gap-2 w-[150px] lg:w-[210px] hidden lg:table-cell">
                {item.exit1} {"->"} {item.entry2}
                {!isLarge && (
                  <span>({formatDataTime(item.timeLunchString)})</span>
                )}
              </td>
              <td className="py-1 px-6 hidden lg:table-cell">{item.exit2}</td>
              <td className="px-6 relative">
                <span
                  className={`flex items-center gap-2 ${
                    item.status !== "NEGATIVE" && "ml-3"
                  }`}
                >
                  {item.status === "NEGATIVE" && <strong>-</strong>}
                  {formatDataTime(item.bonusTimeString)}
                  <strong
                    className={`
                    w-2
                    h-2
                    rounded-full

                    ${
                      item.status === "POSITIVE"
                        ? "bg-green-600"
                        : item.status === "NEGATIVE"
                        ? "bg-red-600"
                        : "bg-gray-600"
                    }
                  `}
                  ></strong>
                </span>
              </td>
              <td className="">{formatDataTime(item.totalWork)}</td>
              <td className="px-6">
                <div className="flex gap-2">
                  <label title="Editar">
                    <Eraser
                      size={22}
                      className="transition-all hover:text-blue-400 hover:cursor-pointer"
                      onClick={() => onOpenEditModalPoint(item)}
                    />
                  </label>
                  <label title="Excluir">
                    <Trash
                      size={22}
                      className="transition-all hover:text-red-400 hover:cursor-pointer"
                      onClick={() => onOpenDeleteModalPoint(item.id)}
                    />
                  </label>
                  <label title="Detalhes">
                    <ClipboardText
                      className="transition-all hover:text-green-400 hover:cursor-pointer"
                      size={22}
                    />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
