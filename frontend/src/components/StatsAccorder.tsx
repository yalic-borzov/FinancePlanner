import React, {useState} from "react";
import AccordionforStats from "./AccordionforStats.tsx";
import ExpensesChart from "./ExpensesChart.tsx";
import ExpensesStats from "./ExpensesStats.tsx";
import {useExpenses} from "../context/ExpensesContext.tsx";

interface IStatsAccorder {
    accountId?: number | null;
}

const StatsAccorder: React.FC<IStatsAccorder> = ({accountId}) => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const {fetchExpensesStats, stats} = useExpenses();
    return (
        <AccordionforStats title="Статистика"
                           fetchStats={() => fetchExpensesStats(selectedPeriod, accountId)}>

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

    )
}

export default StatsAccorder;