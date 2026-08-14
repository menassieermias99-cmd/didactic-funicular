"use client";

import { useState, useEffect } from "react";
import { Expense, ExpenseSummary, NewExpense } from "@/types/expense";
import {
  getExpenses,
  getSummary,
  createExpense,
  deleteExpense,
} from "@/lib/api";
import SummaryCards from "@/components/SummaryCards";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const [expenseData, summaryData] = await Promise.all([
        getExpenses(),
        getSummary(),
      ]);
      setExpenses(expenseData);
      setSummary(summaryData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleAddExpense = async (data: NewExpense) => {
    await createExpense(data);
    await refreshData();
  };

  const handleDeleteExpense = async (id: number) => {
    await deleteExpense(id);
    await refreshData();
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Finance <span className="text-sky-400">Tracker</span>
          </h1>
          <p className="text-slate-400">
            Next.js + Spring Boot Full-Stack Solution
          </p>
        </header>

        {loading ? (
          <div className="text-center py-12 text-slate-400">
            Loading expenses ...
          </div>
        ) : (
          <>
            <SummaryCards summary={summary} />
            <ExpenseForm onExpenseAdded={handleAddExpense} />
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
          </>
        )}
      </div>
    </main>
  );
}
