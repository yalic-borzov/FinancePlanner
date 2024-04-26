import React, {useEffect} from "react";
import Header from "../components/Header.tsx";
import {useExpenses} from "../context/ExpensesContext.tsx";
import AddCategoryForm from "../components/AddCategoryForm.tsx";
import {Button} from "react-bootstrap";


const CategoriesPage: React.FC = () => {
    const {fetchCategories, categories, deleteCategory} = useExpenses();
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
                            <div className="row">
                                <div className="col">
                                      <span key={category.id}>
                                        {category.name}
                                        </span>
                                </div>
                                <div className="col">
                                    <Button variant={"danger"} onClick={() => deleteCategory(category.id)}>Удалить
                                        категорию</Button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoriesPage;