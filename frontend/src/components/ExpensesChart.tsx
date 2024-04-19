import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import 'chart.js/auto'; // Для регистрации контроллеров диаграммы

interface ExpensesChartProps {
    stats: {
        top_categories: {
            amount: number;
            category_name: string;
        }[];
    };
}

const ExpensesChart: React.FC<ExpensesChartProps> = ({stats}) => {
    const data = {
        labels: stats.top_categories.map((c) => c.category_name),
        datasets: [
            {
                label: 'Расходы по категориям',
                data: stats.top_categories.map((c) => c.amount),
                backgroundColor: [
                    // Здесь можно определить цвета для каждой категории
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    // Здесь можно определить цвета границ для каждой категории
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data}/>;
};

export default ExpensesChart;
