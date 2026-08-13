import { Expense, ExpenseSummary, NewExpense } from "@/types/expense";

const API_BASE_URL = "https://localhost:8080/api/expenses";

export async function getExpenses(): Promise<Expense[]> {
  const res = await fetch(API_BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
}

export async function getSummary(): Promise<ExpenseSummary> {
  const res = await fetch(`${API_BASE_URL}/summary`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}

export async function createExpense(data: NewExpense): Promise<Expense> {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create expense");
  return res.json();
}

export async function deleteExpense(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete expense");
}
