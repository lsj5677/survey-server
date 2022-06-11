/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { CustomRequest, CustomResponse } from 'src/type/http.type';
import { FirebaseUtil } from 'src/util/firebase.util';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {

  // 생성자 매개변수
  constructor(
    // entity를 repository로 감싸줌
    @InjectRepository(UserEntity)
    // DI
    private userRepo: Repository<UserEntity>,
    private firebaseUtil: FirebaseUtil
  ) { }

  @Post('sign-up')
  async createUser(
    // 제공받고 싶은 객체를 데코레이터로 지정
    // request 안에서 body 꺼내쓰기 힘듦 nest가 제공
    @Body() body: any,
    @Req() req: CustomRequest,
    @Res() res: CustomResponse,
  ) {
    console.log(`SUJIN:: ~ req`, req.body)
    console.log(`SUJIN:: ~ body`, body)
    try {

      // token 검증
      const user = await this.firebaseUtil.verifyIdToken(body.token);

      // 이메일 검증

      const newUser = this.userRepo.create();

      newUser.email = `${body.email}`;
      newUser.password = `${body.password}`;
      newUser.name = `${body.name}`;


      const saveRes = await this.userRepo.save(newUser);

      // json이 send 역할
      return res.json(saveRes);

      // 통신 끝에는 res 객체를 client로 던지기

    } catch (error) {
      throw error;
    }
  }
}
