// В файле src/types/index.ts
export interface Category {
    id: number;
    name: string;
}

export interface Expense {
    id: number;
    category_id: number;
    amount: number;
    date: string;
    description?: string;
    category: Category;
}

export interface SubmitButtonProps {
    text: string;
    key?: string;
    onClick: () => void;
}


export interface ExpensesStats {
    top_categories: Array<{
        category_id: string,
        category_name: string,
        amount: number
    }>;
    total_amount: number;
    total_count: number;
}
