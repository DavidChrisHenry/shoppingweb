import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyProduct } from './schemas/buyproducts.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('BuyProduct')
    private readonly BuyProductModel: Model<BuyProduct>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.password === pass) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async handleBuyProduct(token: string, buyProduct: BuyProduct) {
    const decodedToken = this.jwtService.verify(token);
    buyProduct.username = decodedToken.username;
    const newPost = new this.BuyProductModel(buyProduct);
    return await newPost.save();
  }
  async logout(token: string, res: any) {
    res.clearCookie(token);
  }
}
