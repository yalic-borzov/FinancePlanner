import React, {useEffect, useState} from 'react';
import {ExpensesStats as ExpensesStatsType} from '../types';
import {expensesService} from "../api/expensesService.ts";
import Header from "../components/Header.tsx";
import Numpad from "../components/Numpad.tsx";
import PrimaryButton from "../components/PrimaryButton.tsx";
import ExpensesChart from "../components/ExpensesChart.tsx";
import Accordion from "../components/AccordionforStats.tsx";
import ExpensesStats from "../components/ExpensesStats.tsx";
import ExpensesList from "../components/ExpensesList.tsx";
import {useExpenses} from "../context/ExpensesContext.tsx";
import AddCategoryForm from "../components/AddCategoryForm.tsx";


const DashboardPage: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [stats, setStats] = useState<ExpensesStatsType | null>(null);
    const {fetchExpenses} = useExpenses();
    const {fetchCategories, categories} = useExpenses();

    useEffect(() => {
        // expensesService.getCategories().then(setCategories).catch(console.error);
        expensesService.getExpensesStats('month').then(setStats).catch(console.error);
    }, []);
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


    const handleAddExpense = async () => {
        if (!amount || !selectedCategory) {
            alert('Заполните все поля');
            return;
        }
        try {
            await expensesService.createExpense(
                parseInt(selectedCategory),
                parseFloat(amount),
                ''
            );
            fetchExpenses();
            alert('Трата успешно добавлена');
            // Очистить поля формы или обновить состояние после успешного добавления
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
                <AddCategoryForm/>
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
                        <PrimaryButton onClick={() => handleAddExpense()} text={'Добавить трату'}/>

                    </div>

                    <div className="block__stats">
                        <Accordion>
                            {stats && <ExpensesChart stats={stats}/>}
                            <ExpensesStats period="month"/>
                        </Accordion>
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
