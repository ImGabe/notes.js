import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, BeforeInsert } from "typeorm";
import { MinLength, MaxLength } from "class-validator";

import { User } from "./User";

@Entity()
export class Note {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, unique: true })
  @Generated("uuid")
  uuid: string;

  @Column({ nullable: false })
  @MinLength(10, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  title: string;

  @Column({ nullable: false })
  @MinLength(2, {
    message: 'Content is too short',
  })
  @MaxLength(256, {
    message: 'Content is too long',
  })
  content: string;

  @Column({ type: 'date', default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;

  @ManyToOne(() => User, user => user.notes, { nullable: false, onDelete: 'CASCADE' })
  user: User;

}
