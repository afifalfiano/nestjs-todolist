import { ApiProperty } from '@nestjs/swagger';
import { StatusTodos } from 'src/entities';
import { Category } from 'src/interfaces/Category.model';
import { CreateCategoryDto, UpdateCategoryDto } from './Category.dto';

export class CreateTodolistDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    example: 'Learning Nestjs',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    example: 'How to learnig nestjs ...',
  })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    required: true,
    example: new Date().getTime(),
  })
  due_time: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    example: 'todo | progress | complete',
    enum: StatusTodos,
  })
  status: string;

  @ApiProperty({
    type: String,
    description: 'This is a uuid category',
    required: false,
  })
  category?: CreateCategoryDto;
}

export class UpdateTodolistDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    example: 'Learning Nestjs',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    example: 'How to learnig nestjs ...',
  })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    required: true,
    example: new Date().getTime(),
  })
  due_time: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    example: 'todo | progress | complete',
    enum: StatusTodos,
  })
  status: string;

  @ApiProperty({
    type: String,
    description: 'This is a uuid category',
    required: false,
  })
  category?: CreateCategoryDto;
}
