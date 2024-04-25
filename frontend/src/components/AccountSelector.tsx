import React, {useEffect} from 'react';
import {useExpenses} from '../context/ExpensesContext';
import {Link} from "react-router-dom";

const AccountSelector: React.FC = () => {
    const {accounts, fetchAccounts, selectAccount} = useExpenses();


    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    return (
        <div className="account-selector">
            {accounts.map(account => (
                <div key={account.id} className="element" onClick={() => selectAccount(account.id)}>
                    <div className="account-details">
                        <Link className={"span-title"} to={`/account/${account.id}`}>{account.name}</Link><br/>
                        <span>Трат за месяц: {account.balance} руб</span>
                    </div>
                    <div className="account-actions">
                        {/* Здесь могут быть дополнительные действия, например, редактирование счета */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccountSelector;
