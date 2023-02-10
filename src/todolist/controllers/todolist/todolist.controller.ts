import {
  Controller,
  Get,
  Param,
  Put,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Body,
  Post,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateTodolistDto, UpdateTodolistDto } from 'src/dtos';
import { StatusTodos } from 'src/entities';
import { TransformInterceptor } from 'src/middlewares';
import { TodolistService } from 'src/todolist/services/todolist/todolist.service';
import { CONSTANT } from 'src/utils';

@ApiTags('Todolist')
@UseInterceptors(TransformInterceptor)
@Controller({ path: CONSTANT.API_PREFIX + 'todolist', version: '1' })
export class TodolistController {
  constructor(private todolistService: TodolistService) {}
  @Get()
  getTodos() {
    return this.todolistService.findAll();
  }

  @Get('/view/:uuid')
  getTodoById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.todolistService.findTodoById(uuid);
  }
  
  @Get('/count/:totalStatus')
  countTotalStatus(@Param('totalStatus') status: StatusTodos) {
    return this.todolistService.countTotalStatus(status);
  }

  @Put(':uuid/:status')
  changeStatusTodo(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Param('status') statusTodo: StatusTodos,
  ) {
    if (!Object.values(StatusTodos).includes(statusTodo)) {
      throw new HttpException('Status not found!', HttpStatus.BAD_REQUEST);
    }
    return this.todolistService.changeStatusTodo(uuid, statusTodo);
  }

  @Post()
  createTodo(@Body() createTodolistDto: CreateTodolistDto) {
    return this.todolistService.createTodo(createTodolistDto);
  }

  @Delete(':uuid')
  deleteTodo(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.todolistService.deleteTodo(uuid);
  }

  @Put(':uuid')
  updateTodo(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ) {
    return this.todolistService.updateTodo(uuid, updateTodolistDto);
  }
  
}
