import React, {useEffect, useState} from 'react';
import {Category, Expense} from '../types';
import {useExpenses} from "../context/ExpensesContext.tsx";

interface ExpensesListProps {
    categories: Category[];
}

const ExpensesList: React.FC<ExpensesListProps> = ({categories}) => {
    const {expenses} = useExpenses();
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
        };

        filterExpenses();
    }, [selectedCategory, expenses]);

    return (
        <div>
            <select onChange={e => setSelectedCategory(e.target.value)}>
                <option value="all">Все категории</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <ul>
                {filteredExpenses.map(expense => (
                    <li key={expense.id}>
                        {expense.date}: {categories.find(c => c.id === expense.category_id)?.name} - {expense.amount} {expense.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpensesList;
