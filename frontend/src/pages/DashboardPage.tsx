import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import ExpensesList from "../components/ExpensesList";
import {useExpenses} from "../context/ExpensesContext";
import AccountSelector from "../components/AccountSelector.tsx";
import ExpensesChart from "../components/ExpensesChart.tsx";
import ExpensesStats from "../components/ExpensesStats.tsx";
import AccordionforStats from "../components/AccordionforStats.tsx";

const DashboardPage: React.FC = () => {
    // const [amount, setAmount] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const {fetchCategories, categories, fetchExpensesStats, stats} = useExpenses();
    const {expenses} = useExpenses();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories, selectedPeriod]);

    return (
        <>
            <Header/>
            <div className="container my-4">
                <div className="row">
                    <div className="col">
                        <h1>Ваши счета:</h1>
                        <AccountSelector/>
                    </div>
                    <div className="col-md-7">
                        <h1>Последние транзакции:</h1>


                        <div className="block__stats">
                            <AccordionforStats title="Статистика"
                                               fetchStats={() => fetchExpensesStats(selectedPeriod)}>

                                <div className="btn-group" role="group">
                                    <input type="radio"
                                           className={`btn-check ${selectedPeriod === 'month' ? 'active' : ''}`}
                                           name="btnradio" id="btnradio1"
                                           autoComplete="off" onClick={() => setSelectedPeriod('month')} checked/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Месяц</label>

                                    <input type="radio"
                                           className={`btn-check ${selectedPeriod === 'week' ? 'active' : ''}`}
                                           name="btnradio" id="btnradio2"
                                           autoComplete="off" onClick={() => setSelectedPeriod('week')}/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Неделя</label>
                                </div>
                                <ExpensesChart stats={stats}/>
                                <ExpensesStats period={selectedPeriod}/>

                            </AccordionforStats>
                        </div>
                        {/*<h1>Последние транзакции:</h1>*/}
                        <div className="history__block">
                            <ExpensesList categories={categories} expenses={expenses}/>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default DashboardPage;
