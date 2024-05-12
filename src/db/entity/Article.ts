import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
@Entity({ name: "articles" })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column("text")
  content!: string;

  @Column({ nullable: true, default: "/image/cover.png" })
  cover!: string;

  @Column({ default: 0 })
  views!: number;

  @Column({ default: 0 })
  stars!: number;

  @Column({ default: 0 })
  likes!: number;

  @Column({ default: 0 })
  reviews!: number;

  @Column({ default: false })
  is_publish!: boolean;

  // 1: 未删除 0: 已删除(进入回收站) -1: 彻底删除
  @Column({ default: 1 })
  is_delete!: number;

  @CreateDateColumn()
  create_time!: Date;

  @UpdateDateColumn()
  update_time!: Date;

  @ManyToOne(() => User, (user) => user.articles, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" }) // 自定义关联列名, 默认是 userID;  实体中不需要定义 user_id 字段
  user!: Relation<User>;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments!: Relation<Comment[]>;
}
