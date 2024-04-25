// ExpensesContext.tsx

import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {Account, Category, Expense, ExpensesStats as ExpensesStatsType} from '../types/types.ts';
import {expensesService} from "../api/expensesService.ts";

interface ExpensesContextType {
    expenses: Expense[];
    categories: Category[];
    accounts: Account[];
    stats: ExpensesStatsType | null;
    fetchExpenses: (accountId: number | null) => void;
    fetchExpensesStats: (period: string, accountId?: number | null) => void;
    fetchCategories: () => void;
    addCategory: (categoryName: string) => void;
    deleteExpense: (id: number) => void;
    deleteCategory: (id: number) => void;
    fetchAccounts: () => void;
    addAccount: (name: string) => void;
    getAccountDetails: (id: number) => void;
    selectedAccount: Account | null;
    selectAccount: (accountId: number) => void;

}

interface ExpenseProviderType {
    children: ReactNode;
}

const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    categories: [],
    stats: null,
    accounts: [],
    selectedAccount: null,
    fetchExpenses: () => Promise.resolve(),
    fetchExpensesStats: () => Promise.resolve(),
    fetchCategories: () => Promise.resolve(),
    addCategory: () => Promise.resolve(),
    deleteExpense: () => Promise.resolve(),
    deleteCategory: () => Promise.resolve(),
    fetchAccounts: () => Promise.resolve(),
    addAccount: () => Promise.resolve(),
    getAccountDetails: () => Promise.resolve(),
    selectAccount: () => Promise.resolve(),
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
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    const fetchExpenses = useCallback(async (accountId: number | null = null) => {
        try {
            const fetchedExpenses = await expensesService.getExpenses(accountId);
            setExpenses(fetchedExpenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }, []);

    const fetchExpensesStats = useCallback(async (period: string, accountId: number | null = null) => {
        try {
            console.log(`Fetching expenses stats for period: ${period}`);
            const fetchedStats = await expensesService.getExpensesStats(period, accountId);
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

    const selectAccount = useCallback((accountId: number) => {
        const account = accounts.find(acc => acc.id === accountId);
        setSelectedAccount(account || null);
    }, [accounts]);

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

    const fetchAccounts = useCallback(async () => {
        try {
            const response = await expensesService.getAccounts();
            setAccounts(response);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }, []);

    const addAccount = useCallback(async (name: string) => {
        try {
            const response = await expensesService.addAccount({name});
            setAccounts(currentAccounts => [...currentAccounts, response]);
            await fetchAccounts()
        } catch (error) {
            console.error('Error adding account:', error);
        }
    }, []);

    const getAccountDetails = useCallback(async (id: number) => {
        try {
            const response = await expensesService.getAccount(id);
            setAccounts(currentAccounts => [...currentAccounts, response])
        } catch (error) {
            console.error('Error fetching account details:', error);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return (
        <ExpensesContext.Provider
            value={{
                expenses,
                categories,
                stats,
                accounts,
                fetchExpenses,
                fetchCategories,
                addCategory,
                deleteExpense,
                deleteCategory,
                fetchExpensesStats,
                fetchAccounts,
                addAccount,
                getAccountDetails,
                selectedAccount,
                selectAccount
            }}>
            {children}
        </ExpensesContext.Provider>
    );
};
