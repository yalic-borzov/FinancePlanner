import React from 'react';
import {useExpenses} from '../context/ExpensesContext';

const ExpensesStats: React.FC<{ period: string }> = ({period}) => {
    const {stats, fetchExpensesStats} = useExpenses();

    React.useEffect(() => {
        if (!stats) {
            // fetchExpensesStats(period);
        }
    }, [period, stats, fetchExpensesStats]);

    if (!stats) {
        return <p>Загрузка статистики...</p>;
    }

    if (!stats.top_categories || stats.top_categories.length === 0) {
        return <p>Нет данных для отображения</p>;
    }

    return (
        <div>
            <h2>Статистика расходов</h2>
            <p>Общая сумма: {stats.total_amount}</p>
            <p>Всего трат: {stats.total_count}</p>
            <h3>Топ категорий:</h3>
            <ul>
                {stats.top_categories.map((cat: { category_id: string, category_name: string, amount: number }) => (
                    <li key={cat.category_id}>
                        {cat.category_name}: {cat.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpensesStats;
