import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as express from 'express';
const dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const host = process.env.HOST;
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(
    session({
      secret: process.env.session_key,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(port);

  console.log(`Server is running at http://${host}:${port}`);
}
bootstrap();
