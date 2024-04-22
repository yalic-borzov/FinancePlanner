import {Expense} from "../types";
import axios from './axiosConfig';

const API_BASE_URL = 'http://localhost:5000/api/planner';

class ExpensesService {
    async createExpense(category_id: number, amount: number, description?: string) {
        const response = await axios.post(`${API_BASE_URL}/expenses`, {
            category_id,
            amount,
            description,
        });
        return response.data;
    }

    async getExpense(id: number): Promise<Expense> {
        const response = await axios.get(`${API_BASE_URL}/expenses/${id}`);
        return response.data;
    }

    async getExpenses(): Promise<Expense[]> {
        const response = await axios.get(`${API_BASE_URL}/expenses`);
        return response.data;
    }

    async deleteExpense(id: number) {
        const response = await axios.delete(`${API_BASE_URL}/expenses/${id}`);
        return response.data;
    }

    async getCategories() {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    }

    async getExpensesStats(period: string) {
        const response = await axios.get(`${API_BASE_URL}/expenses/stats?period=${period}`);
        return response.data;
    }

    async addCategory(param: { name: string }) {
        const response = await axios.post(`${API_BASE_URL}/categories`, param);
        return response.data;
    }

    async deleteCategory(id: number) {
        const response = await axios.delete(`${API_BASE_URL}/categories/${id}`)
        return response.data;
    }
}

export const expensesService = new ExpensesService();
