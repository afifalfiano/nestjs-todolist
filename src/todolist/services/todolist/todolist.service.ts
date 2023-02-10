import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodolistDto } from 'src/dtos';
import { StatusTodos, TodolistEntity } from 'src/entities';
import { CreateTodolistParams, UpdateTodolistParams } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(TodolistEntity)
    private todolistRepository: Repository<TodolistEntity>,
  ) {}

  findAll() {
    return this.todolistRepository.find({
      relations: ['category'],
      order: { createdAt: 'ASC' },
    });
  }

  async findTodoById(id: number) {
    const data = await this.todolistRepository.findOne({
      relations: ['category'],
      where: { id },
    });

    return data;
  }

  async changeStatusTodo(id: number, status: StatusTodos) {
    const data = await this.todolistRepository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException('Todo is not found!', HttpStatus.BAD_REQUEST);
    }
    data.status = status;
    return this.todolistRepository.save(data);
  }

  createTodo(createTodolistDto: CreateTodolistParams) {
    const newTodo = this.todolistRepository.create({ ...createTodolistDto });
    return this.todolistRepository.save(newTodo);
  }

  deleteTodo(id: number) {
    return this.todolistRepository.delete({ id });
  }

  updateTodo(id: number, updateTodolistDto: UpdateTodolistParams) {
    return this.todolistRepository.update({ id }, { ...updateTodolistDto });
  }

  countTotalStatus(status: StatusTodos) {
    if (!Object.values(StatusTodos).includes(status)) {
      throw new HttpException('Status not found!', HttpStatus.BAD_REQUEST);
    };
    return this.todolistRepository.countBy({ status: status });
  }
}
