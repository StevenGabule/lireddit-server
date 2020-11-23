import { Post } from "./Post";
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
