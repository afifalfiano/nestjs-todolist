

export class CreateTodolistDto {
    title: string;
    description: string;
    due_time: Date;
    status: string;
}

export class UpdateTodolistDto {
    title: string;
    description: string;
    due_time: Date;
    status: string;
}
