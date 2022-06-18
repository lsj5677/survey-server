import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 최종적으로 express를 통해서 mapping
async function bootstrap() {

  // CORS 허용
  const options = {
    "origin": ['http://localhost:8080'],
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    // "credentials": true
  }


  // AppModule 안에서부터 nest code
  const app = await NestFactory.create(AppModule);
  app.enableCors(options);

  // pipe로 dto 사용
  // dto에 맞지 않는 요청이 들어오면 쳐냄
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // validation을 위한 decorator가 붙지 않은 속성 제거
      forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체 막음
      transform: true // 요청에서 넘어온 자료 형변환
    })
  )
  await app.listen(3000);

}
bootstrap();
