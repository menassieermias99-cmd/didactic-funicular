import { ExpenseSummary } from "@/types/expense";

export default function SummaryCards({ summary }: { summary: ExpenseSummary }) {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val | 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-800 border border-slate-700 roudned-xl p-6 shadow-xl">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
          Total Balance
        </p>
        <h2
          className={`text-3xl font-extrabold ${summary.balance >= 0 ? "text-sky-400" : "text-rose-400"}`}
        >
          {formatCurrency(summary.balance)}
        </h2>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
          Total Income
        </p>
        <h2 className="text-3xl font-extrabold text-emerald-400">
          {formatCurrency(summary.totalIncome)}
        </h2>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
          Total Expense
        </p>
        <h2 className="text-3xl font-extrabold text-rose-400 ">
          {formatCurrency(summary.totalExpense)}
        </h2>
      </div>
    </div>
  );
}
