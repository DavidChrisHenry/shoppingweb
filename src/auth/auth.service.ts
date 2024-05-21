import { Injectable, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CustomHttpException } from 'src/http_exceptions/custom-http-exception';

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
    if (accessToken) {
      throw new CustomHttpException(
        'Login Succeeded',
        { accessToken },
        true,
        HttpStatus.OK, // (hoặc mã HTTP tùy chọn)
      );
    } else {
      throw new CustomHttpException(
        'Login Unsucceeded',
        {},
        true,
        HttpStatus.CONFLICT, // (hoặc mã HTTP tùy chọn)
      );
    }
  }
}
