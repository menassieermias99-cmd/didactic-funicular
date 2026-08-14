"use client";

import { useState } from "react";
import { NewExpense } from "@/types/expense";

export default function ExpenseForm({
  onExpenseAdded,
}: {
  onExpenseAdded: (data: NewExpense) => Promise<void>;
}) {
  const [formData, setFormData] = useState<NewExpense>({
    title: "",
    amount: 0,
    category: "Food",
    type: "EXPENSE",
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    await onExpenseAdded({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: "",
      amount: 0,
      category: "food",
      type: "EXPENSE",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg mb-8"
    >
      <h3 className="text-xl font-bold text-white mb-4">Add Transaction</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-slate-400 text-xs font-semibold mb-1 uppercase">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label className="block text-slate-400 text-xs font-semibold mb-1 uppercase">
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.amount || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label htmlFor="" className="block">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
          >
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-xs font-semibold mb-1 uppercase">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as "INCOME" | "EXPENSE",
              })
            }
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-6 py-2.5 rounded-lg transition-all cursor-pointer shadow-md hover:shadow-sky-500/20"
      >
        Add Record
      </button>
    </form>
  );
}
