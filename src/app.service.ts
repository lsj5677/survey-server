import { Injectable } from '@nestjs/common';

// Injectable : provider로 사용할 수 있는 class
@Injectable()
export class AppService {
  healthCheck(): string {
    return 'CONNECTION_SUCCESS';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
