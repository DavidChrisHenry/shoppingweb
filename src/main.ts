import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const host = process.env.HOST;
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  await app.listen(port);

  console.log(`Server is running at http://${host}:${port}`);
}
bootstrap();
