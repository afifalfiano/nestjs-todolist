import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './Category.entity';

export enum StatusTodos {
  TODO = 'todo',
  PROGRESS = 'progress',
  COMPLETE = 'complete',
}

@Entity({ name: 'todolist' })
export class TodolistEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  // @Column()
  // @Generated('uuid')
  // uuid: string;

  @Column({ nullable: false, type: 'varchar', length: '25' })
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'bigint', nullable: false, default: new Date().getTime() })
  due_time: number;

  @Column({ enum: StatusTodos, type: 'enum', default: StatusTodos.TODO })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.todolists, {
    onDelete: 'SET NULL',
  })
  category: CategoryEntity;
}
