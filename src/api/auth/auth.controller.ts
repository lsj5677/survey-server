/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { CustomRequest, CustomResponse } from 'src/type/http.type';
import { AuthUtil } from 'src/util/auth.util';
import { FirebaseUtil } from 'src/util/firebase.util';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {

  // 생성자 매개변수
  constructor(
    // entity를 repository로 감싸줌
    @InjectRepository(UserEntity)
    // DI
    // util injection은 service에서
    // controller 에서는 service만 injection
    private userRepo: Repository<UserEntity>,
    private firebaseUtil: FirebaseUtil,
    private authUtil: AuthUtil
  ) { }

  @Post('sign-up')
  async createUser(
    // 제공받고 싶은 객체를 데코레이터로 지정
    // request 안에서 body 꺼내쓰기 힘듦 nest가 제공
    @Body() body: any,
    @Req() req: CustomRequest,
    @Res() res: CustomResponse,
  ) {
    // console.log(`SUJIN createUser:: ~ req`, req.body)
    // console.log(`SUJIN createUser:: ~ body`, body)
    try {

      // -- 비지니스 로직 서비스에서 처리
      // token 검증
      const user = await this.firebaseUtil.verifyIdToken(body.token);
      console.log(`SUJIN:: ~ user`, user)

      const newUser = this.userRepo.create();

      newUser.email = body.email;
      // newUser.password = `${body.password}`;
      newUser.name = body.name ? body.name : this.authUtil.getRandomUserName(body.email);


      const saveRes = await this.userRepo.save(newUser);
      // 비지니스 로직 ---

      // json이 send 역할
      return res.json(saveRes);

      // 통신 끝에는 res 객체를 client로 던지기

    } catch (error) {
      throw error;
    }
  }
  @Post('token-verify')
  async tokenVerify(
    @Body() body: any,
    @Req() req: CustomRequest,
    @Res() res: CustomResponse
  ) {
    console.log(`SUJIN:: ~ body`, body)
    try {
      const user = await this.firebaseUtil.verifyIdToken(body.token);
      // 이메일로 사용자정보 조회해서 가져오기
      const userInfo = await this.userRepo.findOne({
        where: {
          email: `${user.email}`
        }
      })
      console.log(`SUJIN:: ~ userInfo`, userInfo)

      return res.json(userInfo);

    } catch (error) {
      throw error;
    }
  }
}
