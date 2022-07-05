import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SurveyEntity } from "src/entity/survey.entity";
import { UserEntity } from "src/entity/user.entity";

export const EntityList = [
  UserEntity,
  SurveyEntity
]

export const getDatabaseConfig = async (): Promise<TypeOrmModuleOptions> => {
  return {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "survey",
    // logging: true,
    entities: [...EntityList],
    subscribers: [],
    migrations: [],
  }
}