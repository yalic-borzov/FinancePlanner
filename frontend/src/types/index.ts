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
