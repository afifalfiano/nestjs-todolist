import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "./Category.entity";

export enum StatusTodos {
    TODO = 'todo',
    PROGRESS = 'progress',
    COMPLETE = 'complete'
}

@Entity({name: 'todolist'})
export class TodolistEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({nullable: false, type: 'varchar', length: '25'})
    title: string;

    @Column({nullable: true, type: 'text'})
    description: string;

    @Column({type: 'date', nullable: true})
    due_time: Date;

    @Column({enum: StatusTodos, type: 'enum', default: StatusTodos.TODO})
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, (category) => category.todolists)
    category: CategoryEntity;
}