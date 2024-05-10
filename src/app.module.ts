import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { QueryValidationMiddleware } from './middlewares/query-validation.middleware';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://BSLapJIPgnU3ReR4:BSLapJIPgnU3ReR4@atlascluster.vjgfnz8.mongodb.net/',
      {
        dbName: 'shopping_website',
      },
    ),
    ProductsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(QueryValidationMiddleware).forRoutes('products'); // Áp dụng cho các tuyến đường /products
  }
}
