import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "./User";
import { Article } from "./Article";
@Entity({ name: "comments" })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @CreateDateColumn()
  create_time!: Date;

  @UpdateDateColumn()
  update_time!: Date;

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" }) // 自定义关联列名, 默认是 userID;  实体中不能再额外定义 user_id 字段
  user!: Relation<User>;

  @ManyToOne(() => Article, (article) => article.comments, {
    cascade: true,
  })
  @JoinColumn({ name: "article_id" })
  article!: Relation<Article>;
}
