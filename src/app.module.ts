import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistModule } from './todolist/todolist.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TodolistModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
