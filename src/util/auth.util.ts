import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUtil {
  constructor(
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
}