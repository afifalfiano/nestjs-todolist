import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'todolist', version: '1' })
export class TodolistController {
  @Get()
  getTodos() {
    return 'Hello World';
  }
}
