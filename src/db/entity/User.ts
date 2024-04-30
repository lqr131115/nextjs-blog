import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
  BaseEntity,
} from "typeorm";
import { UserAuth } from "./UserAuth";
@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nickname!: string;

  @Column()
  avatar!: string;

  @Column()
  job!: string;

  @Column()
  introduce!: string;

  @OneToMany(() => UserAuth, (auth) => auth.user)
  auths!: Relation<UserAuth[]>;
}
