import React, {useEffect} from "react";
import Header from "../components/Header.tsx";
import {useExpenses} from "../context/ExpensesContext.tsx";
import AddCategoryForm from "../components/AddCategoryForm.tsx";
import {Button} from "react-bootstrap";


const CategoriesPage: React.FC = () => {
    const {fetchCategories, categories} = useExpenses();
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);
    return (
        <>
            <Header/>
            <div className="container">
                <h1>Список категорий</h1>
                <AddCategoryForm/>
                <div className="history__block">

                    {categories.map(category => (
                        <div className="element" key={category.id}>
                        <span key={category.id}>
                            {category.name}
                        </span>
                            <Button variant={"danger"}>Удалить категорию</Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoriesPage;