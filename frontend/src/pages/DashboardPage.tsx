import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import ExpensesList from "../components/ExpensesList";
import {useExpenses} from "../context/ExpensesContext";
import AccountSelector from "../components/AccountSelector.tsx";
import AddAccountModal from "../components/AddAccountModal.tsx";
import StatsAccorder from "../components/StatsAccorder.tsx";

const DashboardPage: React.FC = () => {
    // const [amount, setAmount] = useState('');
    const [selectedPeriod] = useState('month');
    const {fetchCategories, categories, selectedAccount, fetchExpenses} = useExpenses();
    const {expenses} = useExpenses();
    const [show, setShow] = useState(false);


    if (selectedAccount) {
        useEffect(() => {
            fetchExpenses(null)
        }, [fetchExpenses]);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories, selectedPeriod]);

    return (
        <>
            <Header/>
            <AddAccountModal show={show} handleClose={handleClose}/>

            <div className="container my-4">
                <div className="row">
                    <div className="col">
                        <h1>Ваши счета:</h1>
                        <AccountSelector/>
                        <div className="element">
                            <span onClick={handleShow} className={"span-title pointer"}><i
                                className="bi bi-plus-lg"></i>Создать новый счет</span>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h1>Последние транзакции:</h1>


                        <div className="block__stats">
                            <StatsAccorder/>
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
