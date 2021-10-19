import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsEmail, MinLength, MaxLength } from "class-validator";

import { Note } from "./Note";
import { hashSync } from "bcryptjs";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, unique: true })
  @Generated("uuid")
  uuid: string;

  @Column({ nullable: false, unique: true })
  @MinLength(4, {
    message: 'username-short.',
  })
  @MaxLength(15, {
    message: 'username-long.',
  })
  username: string;

  @Column({ nullable: false, unique: true })
  @IsEmail(undefined, { message: 'email-invalid'})
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'date', default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;

  @OneToMany(() => Note, note => note.user)
  notes: Note[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password, 8)
  }

}
