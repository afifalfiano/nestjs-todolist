import { Category } from "src/interfaces/Category.model";
import { CreateCategoryDto, UpdateCategoryDto } from "./Category.dto";


export class CreateTodolistDto {
    title: string;
    description: string;
    due_time: number;
    status: string;
    category?: CreateCategoryDto;
}

export class UpdateTodolistDto {
    title: string;
    description: string;
    due_time: number;
    status: string;
    category?: UpdateCategoryDto;
}
