import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { AuthUtil } from 'src/util/auth.util';
import { FirebaseUtil } from 'src/util/firebase.util';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    // entity를 repository로 감싸줌
    @InjectRepository(UserEntity)

    private userRepo: Repository<UserEntity>,
    private firebaseUtil: FirebaseUtil,
    private authUtil: AuthUtil
  ) { }

  async createUser(params): Promise<any> {
    try {

      // token 검증
      const user = await this.firebaseUtil.verifyIdToken(params.token);
      console.log(`SUJIN:: ~ user`, user)

      const newUser = this.userRepo.create();

      newUser.email = params.email;
      // newUser.password = `${body.password}`;
      newUser.name = params.name ? params.name : this.authUtil.getRandomUserName(params.email);

      const saveRes = await this.userRepo.save(newUser);

      return saveRes;

    } catch (error) {
      throw error;
    }
  }

  async tokenVerify(params): Promise<any> {
    console.log(`SUJIN:: ~ body`, params)
    try {
      const user = await this.firebaseUtil.verifyIdToken(params.token);
      // 이메일로 사용자정보 조회해서 가져오기
      const userInfo = await this.userRepo.findOne({
        where: {
          email: `${user.email}`
        }
      })
      console.log(`SUJIN:: ~ userInfo`, userInfo)

      return userInfo;

    } catch (error) {
      throw error;
    }
  }
}

