import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "./User";

@Entity({ name: "user_auths" })
export class UserAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  identify_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;

  @ManyToOne(() => User, (user) => user.auths, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" }) // 自定义关联列名, 默认是 userID;  实体中不能再额外定义 user_id 字段
  user!: Relation<User>;
}
