import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Body,
  Post,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateTodolistDto, UpdateTodolistDto } from 'src/dtos';
import { StatusTodos } from 'src/entities';
import { TransformInterceptor } from 'src/middlewares';
import { TodolistService } from 'src/todolist/services/todolist/todolist.service';
import { CONSTANT } from 'src/utils';

@UseInterceptors(TransformInterceptor)
@Controller({ path: CONSTANT.API_PREFIX + 'todolist', version: '1' })
export class TodolistController {
  constructor(private todolistService: TodolistService) {}
  @Get()
  getTodos() {
    return this.todolistService.findAll();
  }

  @Get('/view/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todolistService.findTodoById(id);
  }

  @Put(':id/:status')
  changeStatusTodo(
    @Param('id', ParseIntPipe) id: number,
    @Param('status') statusTodo: StatusTodos,
  ) {
    if (!Object.values(StatusTodos).includes(statusTodo)) {
      throw new HttpException('Status not found!', HttpStatus.BAD_REQUEST);
    }
    return this.todolistService.changeStatusTodo(id, statusTodo);
  }

  @Post()
  createTodo(@Body() createTodolistDto: CreateTodolistDto) {
    return this.todolistService.createTodo(createTodolistDto);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todolistService.deleteTodo(id);
  }

  @Put(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ) {
    return this.todolistService.updateTodo(id, updateTodolistDto);
  }

  @Get('/count/:totalStatus')
  countTotalStatus(@Param('totalStatus') status: StatusTodos) {
    return this.todolistService.countTotalStatus(status);
  }
  
}
