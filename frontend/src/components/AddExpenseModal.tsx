import React, {useState} from 'react';
import {IAddExpenseModal} from "../types/types.ts";
import {useExpenses} from "../context/ExpensesContext.tsx";
import {expensesService} from "../api/expensesService.ts";
import BasedModal from "./BasedModal.tsx";
import Numpad from "./Numpad.tsx";

const AddExpenseModal: React.FC<IAddExpenseModal> = ({show, handleClose, accountId}) => {
    const [amount, setAmount] = useState('');
    const {categories} = useExpenses();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const {fetchExpenses} = useExpenses();

    const handleAddExpense = async () => {
        if (!amount || !selectedCategory) {
            alert('Заполните все поля');
            return;
        }
        try {
            await expensesService.createExpense(parseInt(selectedCategory), parseFloat(amount), '', accountId);
            fetchExpenses(null);
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
            <BasedModal addFunction={handleAddExpense} addText={"Добавить трату"} handleClose={handleClose}
                        show={show} Title={"Добавить трату"}>
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
                    </div>
                </div>
            </BasedModal>
        </>
    );
}

export default AddExpenseModal;