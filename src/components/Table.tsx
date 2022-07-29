export function Table() {
  return (
    <div className="overflow-x-auto relative table-auto rounded-md shadow-2xl bg-blue-600 h-full">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th className="py-3 px-6">Data</th>
            <th className="py-3 px-6">Entrada</th>
            <th className="py-3 px-6">Almoço</th>
            <th className="py-3 px-6">Saída</th>
            <th className="py-3 px-6">Bonús</th>
          </tr>
        </thead>
        <tbody>
          <tr className=" border-b bg-gray-800 border-gray-700">
            <th className="py-2 px-6 font-medium  whitespace-nowrap text-white">
              20 de julho, quarta
            </th>
            <td className="py-1 px-6">09:30</td>
            <td className="py-1 px-6 flex flex-col">
              12:34 até 13:14 <span>(1h:02m)</span>
            </td>
            <td className="py-1 px-6">18:43</td>
            <td className="py-1 px-6">00h:12m</td>
          </tr>
          <tr className=" border-b bg-gray-800 border-gray-700">
            <th className="py-1 px-6 font-medium  whitespace-nowrap text-white">
              20 de julho, quarta
            </th>
            <td className="py-1 px-6">09:30</td>
            <td className="py-1 px-6 flex flex-col">
              12:34 até 13:14 <span>(1h:02m)</span>
            </td>
            <td className="py-1 px-6">18:43</td>
            <td className="py-1 px-6">00h:12m</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
