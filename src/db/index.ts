import "reflect-metadata";
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";
import { User, UserAuth, Article, Comment, Tag, } from "./entity";

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [User, UserAuth, Article, Comment, Tag ],
  synchronize: false, // 初始化后置为false，需要重新初始化设置为true
  logging: false,
});

export const getRepository = async <Entity extends ObjectLiteral>(
  entity: EntityTarget<Entity>
) => {
  return AppDataSource.isInitialized
    ? AppDataSource.getRepository(entity)
    : (await AppDataSource.initialize()).getRepository(entity);
};

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

// AppDataSource.initialize()
//   .then(() => {
//     // here you can start to work with your database
//     console.log("initialize database success!");
//   })
//   .catch((error) => console.log("initialize database failed!", error));
