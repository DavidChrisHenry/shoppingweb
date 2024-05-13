import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { BuyProductSchema } from './schemas/buyproducts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
const dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.jwtConstants,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([
      { name: 'BuyProduct', schema: BuyProductSchema },
    ]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
