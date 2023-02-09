import { Category } from "./Category.model";


export interface Todolist {
    id: number;
    title: string;
    description: string;
    due_time: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    category?: Category;
}