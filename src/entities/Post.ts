import { User } from "./User";
import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field()
  @Column()
  body!: string;

  @Field()
  @Column()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
