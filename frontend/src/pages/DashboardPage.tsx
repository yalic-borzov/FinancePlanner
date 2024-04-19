import React, {useEffect, useState} from 'react';
import Header from "../components/Header.tsx";
import {expensesService} from "../api/expensesService.ts";
import {Expense} from "../types";

const DashboardPage: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await expensesService.getExpenses();
                setExpenses(data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
                // Обработка ошибок, например, можно показать уведомление пользователю
            }
        };

        fetchExpenses();
    }, []);

    return (
        <>
            <Header/>
            <div className="container my-4">
                <h1>Dashboard</h1>
                <div className="my-4">
                    <strong>Баланс: </strong> {/* Здесь будет баланс */}
                </div>
                <h2>Расходы</h2>
                <ul>
                    {expenses.map(expense => (
                        <li key={expense.id}>
                            {expense.date}: {expense.category.name} - {expense.amount} (Описание: {expense.description || 'Нет'})
                        </li>
                    ))}
                </ul>
                {/* Тут можно добавить форму для создания новых расходов */}
            </div>
        </>
    );
};

export default DashboardPage;
