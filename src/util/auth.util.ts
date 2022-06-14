import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase-admin/app';

@Injectable()
export class AuthUtil {

  constructor() {

  }

  getRandomUserName(email) {
    const randomName = email.split('@');
    return randomName[0] + '_' + Math.floor(1000 + Math.random() * 9000).toString();
  }
}