import React, {useEffect, useState} from 'react';
import {Category, Expense} from '../types/types.ts';
import {useExpenses} from "../context/ExpensesContext.tsx";
import {Button} from "react-bootstrap";
import TimeDisplay from "./TimeDisplay.tsx";

interface ExpensesListProps {
    categories: Category[];
    expenses: Expense[];
}

const ExpensesList: React.FC<ExpensesListProps> = ({categories, expenses}) => {
    const {deleteExpense, fetchAccounts} = useExpenses();
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const handleDeleteExpense = async (id: number) => {
        deleteExpense(id)
        fetchAccounts()
    }

    useEffect(() => {
        const filterExpenses = () => {
            if (selectedCategory === 'all') {
                setFilteredExpenses(expenses);
            } else {
                const filtered = expenses.filter(expense => expense.category_id.toString() === selectedCategory);
                setFilteredExpenses(filtered);
            }
            if (expenses.length === 0) {
                return <p>У вас пока нет расходов. Начните добавлять их прямо сейчас!</p>;
            }
        };

        filterExpenses();
    }, [selectedCategory, expenses]);

    return (
        <div>
            <div className="history__block">
                <select onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="all">Все категории</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {filteredExpenses.map(expense => (
                    <div className="element" key={expense.id}>
                        <div className="row">
                            <div className="col-md-7">
                                <span className={"span-title"}>
                                    <i className="bi bi-tag"></i> {categories.find(c => c.id === expense.category_id)?.name}
                                </span> <br/>
                                <span>
                                    <i className="bi bi-cash"></i> {expense.amount} руб
                                </span> <br/>
                                <span>
                                    <i className="bi bi-chat-dots"></i> {expense.description}
                                </span>
                            </div>
                            <div className="col">
                                <span>
                                    <TimeDisplay dateString={expense.date}/><br/>
                                    <span><i className="bi bi-safe"></i> {expense.account.name}</span>
                                </span>
                            </div>
                            <div className="col">
                                <Button variant={"outline-danger"} className={"remove__button"}
                                        onClick={() => handleDeleteExpense(expense.id)}><i
                                    className="bi bi-x-lg"></i></Button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default ExpensesList;
