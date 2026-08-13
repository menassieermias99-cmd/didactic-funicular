export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: "INCOME" | "EXPENSE";
  date: string;
}

export interface ExpenseSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export type NewExpense = Omit<Expense, "id" | "date">;
