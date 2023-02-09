import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, TodolistEntity } from 'src/entities';
import { TodolistController } from './controllers/todolist/todolist.controller';
import { TodolistService } from './services/todolist/todolist.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, TodolistEntity])],
  controllers: [TodolistController],
  providers: [TodolistService],
})
export class TodolistModule {}
