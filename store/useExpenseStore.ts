import { create } from 'zustand';

export interface Expense {
  id: string;
  title: string;
  amount: number;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],

  addExpense: (expense: Expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),

  removeExpense: (id: string) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    })),
}));

export const useTotalExpenses = (): number => {
  const expenses = useExpenseStore((state) => state.expenses);
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};
