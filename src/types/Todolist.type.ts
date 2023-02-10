import { CreateCategoryParams, UpdateCategoryParams } from './Category.type';

export type CreateTodolistParams = {
  title: string;
  description: string;
  due_time: number;
  status: string;
  category?: CreateCategoryParams;
};

export type UpdateTodolistParams = {
  title: string;
  description: string;
  due_time: number;
  status: string;
  category?: UpdateCategoryParams;
};
