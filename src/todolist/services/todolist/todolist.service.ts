import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodolistDto } from 'src/dtos';
import { CategoryEntity, StatusTodos, TodolistEntity } from 'src/entities';
import { CreateTodolistParams, UpdateTodolistParams } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(TodolistEntity)
    private todolistRepository: Repository<TodolistEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  findAll() {
    return this.todolistRepository.find({
      relations: ['category'],
      order: { createdAt: 'ASC' },
    });
  }

  async findTodoById(uuid: string) {
    const data = await this.todolistRepository.findOne({
      relations: ['category'],
      where: { uuid },
    });

    return data;
  }

  async changeStatusTodo(uuid: string, status: StatusTodos) {
    const data = await this.todolistRepository.findOne({ where: { uuid } });
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

  deleteTodo(uuid: string) {
    return this.todolistRepository.delete({ uuid });
  }

  async updateTodo(uuid: string, updateTodolistDto: UpdateTodolistParams) {
    const category = await this.categoryRepository.findOneBy({
      uuid: updateTodolistDto.category,
    });
    return await this.todolistRepository.update(
      { uuid },
      { ...updateTodolistDto, category: { ...category } },
    );
  }

  countTotalStatus(status: StatusTodos) {
    if (!Object.values(StatusTodos).includes(status)) {
      throw new HttpException('Status not found!', HttpStatus.BAD_REQUEST);
    }
    return this.todolistRepository.countBy({ status: status });
  }
}
