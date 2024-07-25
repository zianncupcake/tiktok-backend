import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //we listening on 3000 --> .env
  app.enableCors({
    origin: 'http://127.0.0.1:5174',
    credentials: true,
    //all headers the client are allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    methods:['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  })
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
