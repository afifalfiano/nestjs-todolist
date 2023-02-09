import { Module } from '@nestjs/common';
import { TodolistController } from './controllers/todolist/todolist.controller';
import { TodolistService } from './services/todolist/todolist.service';

@Module({
  controllers: [TodolistController],
  providers: [TodolistService]
})
export class TodolistModule {}
