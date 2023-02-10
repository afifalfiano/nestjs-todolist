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

  async findAll() {
    const data = await this.todolistRepository.find({
      relations: ['category'],
      order: { createdAt: 'ASC' },
    });
    const remapTodolist = [...data].map((item) => {
      delete item.id;
      if (item.category) {
        delete item?.category.id;
      }
      return { ...item };
    });
    return remapTodolist;
  }

  async findTodoById(uuid: string) {
    const data = await this.todolistRepository.findOne({
      relations: ['category'],
      where: { uuid },
    });

    const remapTodolist = { ...data };
    delete remapTodolist.id;
    if (remapTodolist.category) {
      delete remapTodolist.category.id;
    }
    return remapTodolist;
  }

  async changeStatusTodo(uuid: string, status: StatusTodos) {
    const data = await this.todolistRepository.findOne({ where: { uuid } });
    if (!data) {
      throw new HttpException('Todo is not found!', HttpStatus.BAD_REQUEST);
    }
    data.status = status;
    const saveStatus = await this.todolistRepository.save(data);
    const remapTodolist = { ...saveStatus };
    delete remapTodolist.id;
    return remapTodolist;
  }

  async createTodo(createTodolistDto: CreateTodolistParams) {
    const newTodo = await this.todolistRepository.create({
      ...createTodolistDto,
    });
    const data = await this.todolistRepository.save(newTodo);
    const remapTodolist = { ...data };
    delete remapTodolist.id;
    return remapTodolist;
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
