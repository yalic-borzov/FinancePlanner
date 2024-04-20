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


export interface TopCategory {
    amount: number;
    category_id: number;
    category_name: string;
}

export interface ExpensesStats {
    top_categories: TopCategory[];
    total_amount: number;
    total_count: number;
    message?: string;
}
