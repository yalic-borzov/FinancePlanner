// ExpensesContext.tsx

import React, {createContext, useContext, useState, useCallback, useEffect, ReactNode} from 'react';
import { Expense } from '../types';
import {expensesService} from "../api/expensesService.ts";

interface ExpensesContextType {
  expenses: Expense[];
  fetchExpenses: () => void;
}

interface ExpenseProviderType{
  children: ReactNode;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used within a ExpensesProvider');
  }
  return context;
};

export const ExpensesProvider: React.FC<ExpenseProviderType> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = useCallback(async () => {
    try {
      const fetchedExpenses = await expensesService.getExpenses();
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <ExpensesContext.Provider value={{ expenses, fetchExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};
