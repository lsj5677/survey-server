import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { JWT_ACCESS_TOKEN_EXPIRATION_TIME, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRATION_TIME, JWT_REFRESH_TOKEN_SECRET } from 'src/secret/auth.secret';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUtil {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
  ) { }

  getRandomUserName(email) {
    const randomName = email.split('@');
    return randomName[0] + '_' + Math.floor(1000 + Math.random() * 9000).toString();
  }

  async getUserInfo(email) {
    const user = await this.userRepo.findOne({
      where: {
        email
      },
    })

    return user;
  }

  // payload : json object
  // sign 함수를 이용해서 token을 만들어줌
  // 사용자 정보 전부 토큰으로 만들어줌
  getAccessToken(payload: any) {
    const signed = this.jwtService.sign(payload, {
      secret: JWT_ACCESS_TOKEN_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME + 's'
    })

    return signed;
  }

  // 사용자 조회할 수 있는 데이터 하나만
  getRefreshToken(userId: number) {
    const payload = { userId };
    const signed = this.jwtService.sign(payload, {
      secret: JWT_REFRESH_TOKEN_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME + 's'
    })

    return signed;
  }

  // 토큰이 들어왔을 때 원래 데이터로 돌림
  // verify 사용
  refreshTokenVerify(refreshToken: string): any {
    return this.jwtService.verify(refreshToken, { secret: JWT_REFRESH_TOKEN_SECRET })
  }

  accessTokenVerify(accessToken: string) {
    return this.jwtService.verify(accessToken, { secret: JWT_ACCESS_TOKEN_SECRET })
  }
}