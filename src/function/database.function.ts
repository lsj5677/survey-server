import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SurveyEntity } from "src/entity/survey.entity";
import { UserEntity } from "src/entity/user.entity";

export const EntityList = [
  UserEntity,
  SurveyEntity
]

export const getDatabaseConfig = async (): Promise<TypeOrmModuleOptions> => {

  let MYSQL_END_POINT = process.env.SURVEY_MYSQL_END_POINT
  let MYSQL_PORT = +process.env.SURVEY_MYSQL_PORT
  let MYSQL_USERNAME = process.env.SURVEY_MYSQL_USERNAME
  let MYSQL_PASSWORD = process.env.SURVEY_MYSQL_PASSWORD
  let MYSQL_DATABASE = process.env.SURVEY_MYSQL_DATABASE


  return {
    type: "mysql",
    host: MYSQL_END_POINT,
    port: MYSQL_PORT,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    timezone: '+09:00',
    // logging: true,
    entities: [...EntityList],
    // entity에서 지워진 컬럼 db에서 지워짐 (데이터도 지워짐) / prod 에서는 무조건 false
    synchronize: false,
    subscribers: [],
    migrations: [],
  }
}