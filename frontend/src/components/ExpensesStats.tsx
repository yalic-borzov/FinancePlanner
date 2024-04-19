import React, {useEffect, useState} from 'react';
import {ExpensesStats as ExpensesStatsType} from '../types';
import {expensesService} from "../api/expensesService.ts";

const ExpensesStats: React.FC<{ period: string }> = ({period}) => {
    const [stats, setStats] = useState<ExpensesStatsType | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsData: ExpensesStatsType = await expensesService.getExpensesStats(period);
                setStats(statsData);
            } catch (error) {
                console.error('Error fetching expenses stats:', error);
            }
        };

        fetchStats();
    }, [period]);

    if (!stats) {
        return <p>Загрузка статистики...</p>;
    }

    return (
        <div>
            <h2>Статистика расходов</h2>
            <p>Общая сумма: {stats.total_amount}</p>
            <p>Всего трат: {stats.total_count}</p>
            <h3>Топ категорий:</h3>
            <ul>
                {stats.top_categories.map((cat) => (
                    <li key={cat.category_id}>
                        {cat.category_name}: {cat.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpensesStats;
