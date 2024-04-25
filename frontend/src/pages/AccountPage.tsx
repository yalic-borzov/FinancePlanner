// AccountPage.tsx
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ExpensesList from '../components/ExpensesList';
import {useExpenses} from '../context/ExpensesContext';
import Header from "../components/Header.tsx";
import {Button} from "react-bootstrap";
import AddExpenseModal from "../components/AddExpenseModal.tsx";
import StatsAccorder from "../components/StatsAccorder.tsx";

const AccountPage = () => {
    const {accountId} = useParams();
    const {accounts, fetchExpenses, expenses} = useExpenses();
    const {fetchAccounts} = useExpenses();
    const {categories, fetchCategories} = useExpenses();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (accountId) {
            fetchExpenses(Number(accountId));
        }
        fetchCategories()
    }, [accountId, fetchExpenses, fetchCategories]);


    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);
    const account = accounts.find(account => account.id.toString() === accountId);

    if (!account) {
        return <div>Счет не найден</div>;
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="account-page">
            <Header/>
            <AddExpenseModal show={show} handleClose={handleClose} accountId={Number(accountId)}/>
            <div className="container">
                <div className="element">
                    <div className="row">
                        <div className="col">
                            <h1>Счет: {account.name}</h1>
                        </div>
                        <div className="col">
                            <Button variant={"outline-success"} onClick={handleShow}>
                                <i className="bi bi-plus-lg"></i>
                            </Button>
                        </div>
                        <div className="col balance-col">
                            <span className={"balance-span"}>Траты: {account.balance} руб</span>
                        </div>
                    </div>
                </div>
                <br/>

                <div className="block__stats w-25 m-auto">
                    <StatsAccorder accountId={Number(accountId)}/>
                </div>
                <ExpensesList expenses={expenses.filter(expense => expense.account_id === account.id)}
                              categories={categories}/>

            </div>

        </div>
    );
};

export default AccountPage;
