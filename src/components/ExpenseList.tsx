"use client";

import { Expense } from "@/types/expense";

export default function ExpenseList({
  expenses,
  onDelete,
}: {
  expenses: Expense[];
  onDelete: (id: number) => Promise<void>;
}) {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
      </div>

      {expenses.length === 0 ? (
        <p className="p-6 text-slate-400 text-center">
          No transactions recorded yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="p-4 font-medium text-white">
                    {expense.title}
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {expense.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-400">{expense.date}</td>
                  <td
                    className={`p-4 font-bold ${expense.type === "INCOME" ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {expense.type === "INCOME" ? "+" : "-"}
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="p-4 text-right ">
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="text-rose-400 hover:text-rose-300 text-sm font-semibold cursor-pointer transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
