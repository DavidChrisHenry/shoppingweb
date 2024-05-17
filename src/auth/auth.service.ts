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

  //kiểm tra user có tồn tại hay không
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.password === pass) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: any, req: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    // req.session.userRole = user.role; // Lưu token vào session
    return {
      access_token: accessToken,
    };
  }

  async logout(req: any) {
    // delete req.session.access_token; // Xóa token khỏi session
    return { message: 'Logged out successfully' };
  }

  //giải mã lấy token của header
  async extractToken(authorizationHeader: string): Promise<string> {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new Error('Invalid Authorization header');
    }
    return authorizationHeader.substring(7);
  }

  // lấy username từ token để xử lý mua hàng
  async buyProduct(token: string, buyProduct: BuyProduct) {
    const decodedToken = await this.jwtService.verify(token);
    buyProduct.username = decodedToken.username;
    const newPost = new this.BuyProductModel(buyProduct);
    return newPost.save();
  }

  async handleBuyProduct(buyProduct: BuyProduct, authorizationHeader: string) {
    const access_token = await this.extractToken(authorizationHeader);
    return this.buyProduct(access_token, buyProduct);
  }
}
