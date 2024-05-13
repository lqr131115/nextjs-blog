import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  BaseEntity,
  JoinTable,
} from "typeorm";
import type { Relation } from "typeorm";
import { UserAuth } from "./UserAuth";
import { Article } from "./Article";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nickname!: string;

  @Column()
  avatar!: string;

  @Column({ nullable: true })
  job!: string;

  @Column({ nullable: true })
  introduce!: string;

  @OneToMany(() => UserAuth, (auth) => auth.user)
  auths!: Relation<UserAuth[]>;

  @OneToMany(() => Article, (article) => article.user)
  articles!: Relation<Article[]>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Relation<Comment[]>;

  @ManyToMany(() => Tag, (tag) => tag.users)
  tags!: Relation<Tag[]>;
}
