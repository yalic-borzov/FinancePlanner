import React, {useState} from 'react';
import {IBasedModal} from "../types/types.ts";
import {expensesService} from "../api/expensesService.ts";
import BasedModal from "./BasedModal.tsx";
import {useExpenses} from "../context/ExpensesContext.tsx";


const AddAccountModal: React.FC<IBasedModal> = ({show, handleClose}) => {
    const [name, setName] = useState('');
    const {fetchAccounts} = useExpenses();
    const addAccount = async () => {
        if (!name) {
            alert("Заполните поле имя")
            return;
        }
        try {
            await expensesService.addAccount({name})
            alert(`Счет "${name}" успешно создан!`);
            fetchAccounts();
            setName('');
        } catch (error) {
            console.log(`Error creating new account: ${error}`)
        }

    }

    return (
        <>
            <BasedModal addText={`Создать счет: ${name}`} addFunction={addAccount} Title={"Добавить счет"} show={show}
                        handleClose={handleClose}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Имя счета" aria-label="AccountName"
                           onChange={e => setName(e.target.value)}
                    />

                </div>

            </BasedModal>
        </>
    )
}

export default AddAccountModal;
