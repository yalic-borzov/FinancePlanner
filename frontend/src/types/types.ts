// В файле src/types/types.ts
import {ReactNode} from "react";

export interface Category {
    id: number;
    name: string;
}

export interface Account {
    balance: number;
    description: string | null;
    id: number;
    name: string;
    user_id: number;
}

export interface Expense {
    account: Account;
    account_id: number;
    amount: number;
    category: {
        id: number;
        name: string;
    };
    category_id: number;
    date: string;
    description: string;
    id: number;
}

export interface SubmitButtonProps {
    text: string;
    key?: string;
    onClick: () => void;
}

export interface IAddExpenseModal {
    show: boolean,
    handleClose: () => void;
    accountId: number;
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

export interface IBasedModal {
    Title?: string,
    show?: boolean,
    handleClose?: () => void;
    addFunction?: () => void;
    addText?: string;
    children?: ReactNode;
}