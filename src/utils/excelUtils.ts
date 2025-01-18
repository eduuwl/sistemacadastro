import * as XLSX from "xlsx";
import { Client } from "../types/client";
import { formatDate } from "./ClientUtils";

/**
 * Exporta uma lista de clientes para um arquivo Excel.
 * @param clients Lista de clientes a ser exportada.
 */

export const exportToExcel = (clients: Client[]): void => {
  if (clients.length === 0) {
    alert("Não há clientes cadastrados para exportar!");
    return;
  }

  const worksheetData = [
    ["Nome", "Data de Nascimento", "Telefone"],
    ...clients.map((client) => [
      client.name,
      formatDate(client.birthDate),
      client.phone,
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

  XLSX.writeFile(workbook, "clientes.xlsx");
};
