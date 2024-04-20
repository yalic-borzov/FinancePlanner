// ExpensesContext.tsx

import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {Category, Expense} from '../types';
import {expensesService} from "../api/expensesService.ts";

interface ExpensesContextType {
    expenses: Expense[];
    categories: Category[];
    fetchExpenses: () => void;
    fetchCategories: () => void;
    addCategory: (categoryName: string) => void;
    deleteExpense: (id: number) => void;
    deleteCategory: (id: number) => void;
}

interface ExpenseProviderType {
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

export const ExpensesProvider: React.FC<ExpenseProviderType> = ({children}) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchExpenses = useCallback(async () => {
        try {
            const fetchedExpenses = await expensesService.getExpenses();
            setExpenses(fetchedExpenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }, []);

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
            value={{expenses, categories, fetchExpenses, fetchCategories, addCategory, deleteExpense, deleteCategory}}>
            {children}
        </ExpensesContext.Provider>
    );
};
