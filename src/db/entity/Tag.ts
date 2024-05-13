import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import type { Relation } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";
@Entity({ name: "tags" })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  icon!: string;

  @Column({ default: 0 })
  follow_count!: number;

  @Column({ default: 0 })
  article_count!: number;

  @ManyToMany(() => User, (user) => user.tags, {
    cascade: true,
  })
  @JoinTable({
    name: "tags_users_rel",
    joinColumn: {
      name: "tag_id",
    },
    inverseJoinColumn: {
      name: "user_id",
    },
  })
  users!: Relation<User[]>;

  @ManyToMany(() => Article, (article) => article.tags, {
    cascade: true,
  })
  @JoinTable({
    name: "tags_articles_rel",
    joinColumn: {
      name: "tag_id",
    },
    inverseJoinColumn: {
      name: "article_id",
    },
  })
  articles!: Relation<Article[]>;
}
