import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistModule } from './todolist/todolist.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, TodolistEntity } from './entities';
import { RouterModule } from '@nestjs/core';
import { CONSTANT } from './utils';

@Module({
  imports: [
    TodolistModule,
    CategoryModule,
    // RouterModule.register([
    //   {
    //     path: CONSTANT.API_PREFIX,
    //     children: [
    //       {
    //         path: 'category',
    //         module: CategoryModule,
    //       },
    //       {
    //         path: 'todolist',
    //         module: TodolistModule,
    //       },
    //     ],
    //   },
    // ]),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs-todolist',
      entities: [CategoryEntity, TodolistEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
