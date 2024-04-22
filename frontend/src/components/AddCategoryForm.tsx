import {useExpenses} from "../context/ExpensesContext.tsx";
import {useState} from "react";
import {expensesService} from "../api/expensesService.ts";

const AddCategoryForm: React.FC = () => {
    const [categoryName, setCategoryName] = useState('');
    const {fetchCategories} = useExpenses(); // Убедитесь, что такой метод есть в контексте

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await expensesService.addCategory({name: categoryName});
            fetchCategories(); // Обновить список категорий
            setCategoryName(''); // Очистить форму
            alert("Успешно добавлено!")
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)}
                   placeholder="Название категории"/>
            <button type="submit">Добавить категорию</button>
        </form>
    );
};

export default AddCategoryForm;