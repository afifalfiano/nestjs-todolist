import { Controller, Get, Param, ParseIntPipe, Put, UseInterceptors } from '@nestjs/common';
import { StatusTodos } from 'src/entities';
import { TransformInterceptor } from 'src/middlewares';
import { TodolistService } from 'src/todolist/services/todolist/todolist.service';
import { CONSTANT } from 'src/utils';

@UseInterceptors(TransformInterceptor)
@Controller({ path: CONSTANT.API_PREFIX + 'todolist', version: '1' })
export class TodolistController {

constructor(private todolistService: TodolistService) {

}
  @Get()
  getTodos() {
    return this.todolistService.findAll();
  }

  @Get(':id') 
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todolistService.findTodoById(id);
  }

  @Put(':id/todo')
  doPendingTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todolistService.changeStatusTodo(id, StatusTodos.TODO);
  }

  @Put(':id/progress')
  doProgressTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todolistService.changeStatusTodo(id, StatusTodos.PROGRESS);
  }

  @Put(':id/complete')
  doCompleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todolistService.changeStatusTodo(id, StatusTodos.COMPLETE);
  }
} 
