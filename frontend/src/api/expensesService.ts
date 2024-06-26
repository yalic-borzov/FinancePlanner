import {Expense} from "../types/types.ts";
import axiosInstance from "./axiosConfig";

import config from '../config.json'

const API_BASE_URL = `${config.API_BASE_URL}/planner`;

class ExpensesService {
    async createExpense(category_id: number, amount: number, description?: string, account_id?: number) {
        const response = await axiosInstance.post(`${API_BASE_URL}/expenses`, {
            category_id,
            amount,
            description,
            account_id
        });
        return response.data;
    }


    async getExpense(id: number): Promise<Expense> {
        const response = await axiosInstance.get(`${API_BASE_URL}/expenses/${id}`);
        return response.data;
    }

    async getExpenses(accountId: number | null = null): Promise<Expense[]> {
        let response;
        if (accountId != null) {
            // @ts-ignore
            const params = new URLSearchParams([['account_id', accountId]]);
            response = await axiosInstance.get(`${API_BASE_URL}/expenses`, {params})
        } else {
            response = await axiosInstance.get(`${API_BASE_URL}/expenses`);
        }
        return response.data;
    }

    async deleteExpense(id: number) {
        const response = await axiosInstance.delete(`${API_BASE_URL}/expenses/${id}`);
        return response.data;
    }

    async getCategories() {
        const response = await axiosInstance.get(`${API_BASE_URL}/categories`);
        return response.data;
    }

    async getExpensesStats(period: string, accountId: number | null) {
        let response;
        if (accountId != null) {
            response = await axiosInstance.get(`${API_BASE_URL}/expenses/stats?period=${period}&?account_id=${accountId}`);
        } else {
            response = await axiosInstance.get(`${API_BASE_URL}/expenses/stats?period=${period}`);
        }
        return response.data;
    }

    async addCategory(param: { name: string }) {
        const response = await axiosInstance.post(`${API_BASE_URL}/categories`, param);
        return response.data;
    }

    async deleteCategory(id: number) {
        const response = await axiosInstance.delete(`${API_BASE_URL}/categories/${id}`)
        return response.data;
    }

    async getAccounts() {
        const response = await axiosInstance.get(`${API_BASE_URL}/accounts`)
        return response.data;
    }

    async addAccount(param: { name: string }) {
        const response = await axiosInstance.post(`${API_BASE_URL}/accounts`, param)
        return response.data;
    }

    async getAccount(account_id: number) {
        const response = await axiosInstance.get(`${API_BASE_URL}/accounts/${account_id}`)
        return response.data;
    }
}

export const expensesService = new ExpensesService();
