import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { QueryValidationMiddleware } from './middlewares/query-validation.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MongoDB_HOST, {
      dbName: process.env.MongoDB_NAME,
    }),
    AuthModule,
    ProductsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(QueryValidationMiddleware).forRoutes('products'); // Áp dụng cho các tuyến đường /products
  }
}
