import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, UserAuth, Article } from "./entity";

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [User, UserAuth, Article],
  synchronize: false,
  logging: false,
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

// AppDataSource.initialize()
//   .then(() => {
//     // here you can start to work with your database
//     console.log("initialize database success!");
//   })
//   .catch((error) => console.log("initialize database failed!", error));
