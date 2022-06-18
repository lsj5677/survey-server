import { SurveyController } from './api/survey/survey.controller';
import { AuthController } from './api/auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { SurveyBoardEntity } from './entity/survey-board.entity';
import { EntityList, getDatabaseConfig } from './function/database.function';
import { FirebaseUtil } from './util/firebase.util';
import { AuthUtil } from './util/auth.util';
import { AuthService } from './api/auth/auth.service';

// module: 상관있는 도메인들 끼리 연결되어 있어야 함
// app.module : 최상위의 모듈 -> 다른 모듈들 import
@Module({
  // 다른곳에 정의 된 모듈 import
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => getDatabaseConfig()
    }),
    // forFeature : repo 사용
    TypeOrmModule.forFeature([
      ...EntityList
    ])
  ],
  // controller class
  controllers: [
    SurveyController,
    AuthController,
    AppController
  ],
  // provider class
  providers: [
    AppService,
    FirebaseUtil,
    AuthUtil,
    AuthService
  ],
})
export class AppModule { }
