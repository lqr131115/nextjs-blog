import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nickname!: string;

  @Column()
  avatar!: string;

  @Column()
  job!: string;

  @Column("text")
  introduce!: string;

  // @OneToMany(() => UserAuth, (auth: UserAuth) => auth.user) // note: we will create user property in the UserAuth class below
  // auths!: UserAuth[];
}
