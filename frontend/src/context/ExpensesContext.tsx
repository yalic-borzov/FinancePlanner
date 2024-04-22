// ExpensesContext.tsx

import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {Category, Expense, ExpensesStats as ExpensesStatsType} from '../types';
import {expensesService} from "../api/expensesService.ts";

interface ExpensesContextType {
    expenses: Expense[];
    categories: Category[];
    stats: ExpensesStatsType | null;
    fetchExpenses: () => void;
    fetchExpensesStats: (period: string) => void;
    fetchCategories: () => void;
    addCategory: (categoryName: string) => void;
    deleteExpense: (id: number) => void;
    deleteCategory: (id: number) => void;
}

interface ExpenseProviderType {
    children: ReactNode;
}

const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    categories: [],
    stats: null,
    fetchExpenses: () => Promise.resolve(),
    fetchExpensesStats: () => Promise.resolve(),
    fetchCategories: () => Promise.resolve(),
    addCategory: () => Promise.resolve(),
    deleteExpense: () => Promise.resolve(),
    deleteCategory: () => Promise.resolve()
});


export const useExpenses = () => {
    const context = useContext(ExpensesContext);
    if (!context) {
        throw new Error('useExpenses must be used within a ExpensesProvider');
    }
    return context;
};

export const ExpensesProvider: React.FC<ExpenseProviderType> = ({children}) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [stats, setStats] = useState<ExpensesStatsType | null>(null);

    const fetchExpenses = useCallback(async () => {
        try {
            const fetchedExpenses = await expensesService.getExpenses();
            setExpenses(fetchedExpenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }, []);

    const fetchExpensesStats = useCallback(async (period: string) => {
        try {
            console.log(`Fetching expenses stats for period: ${period}`);
            const fetchedStats = await expensesService.getExpensesStats(period);
            console.log('Fetched stats:', fetchedStats);
            setStats(fetchedStats);
        } catch (error) {
            console.log('Error fetching stats', error);
        }
    }, [])

    const fetchCategories = useCallback(async () => {
        try {
            const fetchedCategories = await expensesService.getCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    const addCategory = useCallback(async (categoryName: string) => {
        try {
            const newCategory = await expensesService.addCategory({name: categoryName});
            setCategories(prevCategories => [...prevCategories, newCategory]);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    }, []);

    const deleteExpense = useCallback(async (id: number) => {
        try {
            await expensesService.deleteExpense(id);
            fetchExpenses(); // Перезагружаем список расходов после удаления
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    }, [fetchExpenses]);

    const deleteCategory = useCallback(async (id: number) => {
        try {
            await expensesService.deleteCategory(id);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }, [fetchCategories])

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return (
        <ExpensesContext.Provider
            value={{
                expenses,
                categories,
                stats,
                fetchExpenses,
                fetchCategories,
                addCategory,
                deleteExpense,
                deleteCategory,
                fetchExpensesStats
            }}>
            {children}
        </ExpensesContext.Provider>
    );
};
