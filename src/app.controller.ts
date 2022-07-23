import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// 데코레이터로 명시
@Controller()
export class AppController {
  // AppService instance injection
  constructor(private readonly appService: AppService) { }

  // get 요청 데코레이터
  // @Get(string) => string : url
  @Get()
  // 요청이 들어왔을 때 실행되어야 할 함수 구현
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Get('test')
  // 요청이 들어왔을 때 실행되어야 할 함수 구현
  getHello(): string {
    return this.appService.getHello();
  }
}
