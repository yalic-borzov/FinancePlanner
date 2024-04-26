// AccountPage.tsx
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import ExpensesList from '../components/ExpensesList';
import {useExpenses} from '../context/ExpensesContext';
import Header from "../components/Header.tsx";
import {Button} from "react-bootstrap";
import AddExpenseModal from "../components/AddExpenseModal.tsx";
import StatsAccorder from "../components/StatsAccorder.tsx";

const AccountPage = () => {
    const {accountId} = useParams();
    const {
        fetchExpenses,
        expenses,
        fetchAccounts,
        categories,
        fetchCategories,
        selectedAccount,
        selectAccount
    } = useExpenses();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (accountId) {
            fetchExpenses(Number(accountId));
            selectAccount(Number(accountId));
        }
        fetchCategories()
    }, [accountId, fetchExpenses, fetchCategories, fetchAccounts, selectAccount]);


    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);
    // const account = accounts.find(account => account.id.toString() === accountId);
    if (!selectedAccount) {
        return <div>Счет не найден</div>;
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const filteredExpenses = useMemo(() => {
        return expenses.filter(expense => expense.account_id === selectedAccount?.id);
    }, [expenses, selectedAccount?.id]);

    return (
        <div className="account-page">
            <Header/>
            <AddExpenseModal show={show} handleClose={handleClose} accountId={Number(accountId)}/>
            <div className="container">
                <div className="element">
                    <div className="row">
                        <div className="col">
                            <h1>Счет: {selectedAccount.name}</h1>
                        </div>
                        <div className="col">
                            <Button variant={"outline-success"} onClick={handleShow}>
                                <i className="bi bi-plus-lg"></i>
                            </Button>
                        </div>
                        <div className="col balance-col">
                            <span className={"balance-span"}>Траты: {selectedAccount.balance} руб</span>
                        </div>
                    </div>
                </div>
                <br/>

                <div className="block__stats block__stats_acc m-auto">
                    <StatsAccorder accountId={Number(accountId)}/>
                </div>
                <ExpensesList expenses={filteredExpenses}
                              categories={categories}/>

            </div>

        </div>
    );
};

export default AccountPage;
