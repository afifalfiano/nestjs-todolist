import { Todolist } from "./Todolist.model";


export interface Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    todolists?: Todolist[];
}
