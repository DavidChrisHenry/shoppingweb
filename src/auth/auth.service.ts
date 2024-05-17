import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
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

  async login(user: LoginDto, req: any): Promise<any> {
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
}
