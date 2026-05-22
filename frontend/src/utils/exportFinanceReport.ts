import * as XLSX from "xlsx";

type SummaryData = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

type MonthlyData = {
  date: string;
  income: number;
  expense: number;
};

export const downloadFinanceReport = (
  summary: SummaryData,
  monthlyData: MonthlyData[]
) => {
  const workbook = XLSX.utils.book_new();

  const summarySheet = XLSX.utils.json_to_sheet([
    {
      Indicador: "Ingresos",
      Valor: summary.totalIncome,
    },
    {
      Indicador: "Gastos",
      Valor: summary.totalExpense,
    },
    {
      Indicador: "Balance",
      Valor: summary.balance,
    },
    {
      Indicador: "Generado",
      Valor: new Date().toLocaleString("es-CO"),
    },
  ]);

  const monthlySheet = XLSX.utils.json_to_sheet(
    monthlyData.map((item) => ({
      Mes: item.date,
      Ingresos: item.income,
      Gastos: item.expense,
      Balance: item.income - item.expense,
    }))
  );

  XLSX.utils.book_append_sheet(workbook, summarySheet, "Resumen");
  XLSX.utils.book_append_sheet(workbook, monthlySheet, "Mensual");

  XLSX.writeFile(workbook, "reporte-financiero.xls", { bookType: "xls" });
};
