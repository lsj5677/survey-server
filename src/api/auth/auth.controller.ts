/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomResponse } from 'src/type/http.type';
import { AuthSignInDto, AuthSignUpDto, AuthTokenVerifyDto } from './auth.dto';

// 통신의 입구 (요청하고 받는 것)
@Controller('auth')
export class AuthController {

  // 생성자 매개변수
  constructor(
    // DI
    // util injection은 service에서
    // controller 에서는 service만 injection
    private authService: AuthService
  ) { }

  @Post('sign-up')
  async createUser(
    // 제공받고 싶은 객체를 데코레이터로 지정
    // request 안에서 body 꺼내쓰기 힘듦 nest가 제공
    @Body() authSignUpDto: AuthSignUpDto,
    @Res() res: CustomResponse,
  ): Promise<any> {
    const saveRes = await this.authService.createUser(authSignUpDto);
    // json이 send 역할
    return res.json(saveRes);
  }

  @Post('token-verify')
  async tokenVerify(
    @Body() authTokenVerifyDto: AuthTokenVerifyDto,
    @Res() res: CustomResponse,
  ) {
    const userInfo = await this.authService.tokenVerify(authTokenVerifyDto);
    return res.json(userInfo);
  }

  @Post('sign-in')
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
    @Res() res: CustomResponse,
  ): Promise<any> {
    const signInRes = await this.authService.signIn(authSignInDto);
    return res.json(signInRes);
  }
}
