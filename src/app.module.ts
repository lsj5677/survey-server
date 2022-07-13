import { SurveyController } from './api/survey/survey.controller';
import { AuthController } from './api/auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityList, getDatabaseConfig } from './function/database.function';
import { FirebaseUtil } from './util/firebase.util';
import { AuthUtil } from './util/auth.util';
import { AuthService } from './api/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { RootGuard } from './guard/root.guard';
import { JwtService } from '@nestjs/jwt';
import { SurveyService } from './api/survey/survey.service';
import { PaginationUtil } from './util/pagination.util';

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
    AuthService,
    JwtService,
    SurveyService,
    PaginationUtil,
    {
      // APP_GUARD : nest 제공
      provide: APP_GUARD,
      useClass: RootGuard
    }
  ],
})
export class AppModule { }
