import React, {useEffect, useState} from 'react';
import {Category, Expense} from '../types';
import {useExpenses} from "../context/ExpensesContext.tsx";
import {Button} from "react-bootstrap";

interface ExpensesListProps {
    categories: Category[];
}

const ExpensesList: React.FC<ExpensesListProps> = ({categories}) => {
    const {expenses, deleteExpense} = useExpenses();
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');


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
                        <span>
                            {expense.date}: {categories.find(c => c.id === expense.category_id)?.name} - {expense.amount} {expense.description}
                        </span>
                        <Button variant={"outline-danger"} className={"remove__button"}
                                onClick={() => deleteExpense(expense.id)}>Удалить</Button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ExpensesList;
