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
  await app.listen(3000);
}
bootstrap();
