import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodolistEntity } from './Todolist.entity';

@Entity({name: 'category'})
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 25 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TodolistEntity, (todolist) => todolist.category, {onDelete: 'SET NULL'})
  todolists: TodolistEntity[]

}
