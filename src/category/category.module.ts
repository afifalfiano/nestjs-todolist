import { Module } from '@nestjs/common';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controllers/category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, TodolistEntity } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, TodolistEntity])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
