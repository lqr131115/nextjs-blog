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

  // TypeORMError: Relation Tag#users and User#tags both has cascade remove set. This may lead to unexpected circular removals. Please set cascade remove only from one side of relationship.
  @ManyToMany(() => User, (user) => user.tags)
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

  @ManyToMany(() => Article, (article) => article.tags)
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
