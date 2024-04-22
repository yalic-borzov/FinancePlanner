import React, { useEffect, useState } from 'react';
import { expensesService } from "../api/expensesService";
import Header from "../components/Header";
import Numpad from "../components/Numpad";
import PrimaryButton from "../components/PrimaryButton";
import ExpensesList from "../components/ExpensesList";
import { useExpenses } from "../context/ExpensesContext";
import AccordionforStats from "../components/AccordionforStats";
import ExpensesStats from "../components/ExpensesStats";
import ExpensesChart from "../components/ExpensesChart";

const DashboardPage: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState('month'); // Месяц по умолчанию
    const { fetchExpenses, fetchCategories, categories, fetchExpensesStats, stats } = useExpenses();

    useEffect(() => {
        fetchCategories();
        fetchExpensesStats(selectedPeriod); // Изначально загружаем статистику
    }, [fetchCategories, fetchExpensesStats, selectedPeriod]);

    const handleAddExpense = async () => {
        if (!amount || !selectedCategory) {
            alert('Заполните все поля');
            return;
        }
        try {
            await expensesService.createExpense(parseInt(selectedCategory), parseFloat(amount), '');
            fetchExpenses();
            alert('Трата успешно добавлена');
            setAmount('');
            setSelectedCategory('');
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Не удалось добавить');
        }
    };

    return (
        <>
            <Header/>
            <div className="container my-4">
                <h1>Список трат</h1>
                <div>
                    <div className="numpad__block">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={amount}/>
                            <span className="input-group-text">RUB</span>
                        </div>
                        <Numpad value={amount} onValueChange={setAmount}/>
                        <select value={selectedCategory} className={"form-select"}
                                onChange={e => setSelectedCategory(e.target.value)}>
                            <option value="">Выберите категорию расхода</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select><br/>
                        <PrimaryButton onClick={handleAddExpense} text={'Добавить трату'}/>
                        <div className="period-selector">
                            <button className={selectedPeriod === 'month' ? 'active' : ''}
                                    onClick={() => setSelectedPeriod('month')}>Месяц</button>
                            <button className={selectedPeriod === 'week' ? 'active' : ''}
                                    onClick={() => setSelectedPeriod('week')}>Неделя</button>
                        </div>
                    </div>

                    <div className="block__stats">
                        <AccordionforStats title="Статистика" fetchStats={() => fetchExpensesStats(selectedPeriod)}>
                            <ExpensesChart stats={stats}/>
                            <ExpensesStats period={selectedPeriod}/>
                        </AccordionforStats>
                    </div>
                    <div className="history__block">
                        <ExpensesList categories={categories}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
