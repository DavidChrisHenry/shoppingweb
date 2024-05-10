import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { User } from './user/schemas/user.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('user/register')
  async register(@Body() user: User) {
    // Đảm bảo rằng bạn đang sử dụng @Body() để lấy dữ liệu
    const existingUser = await this.userService.findUser(user.username);

    if (!existingUser) {
      return await this.userService.create(user);
    } else {
      return new HttpException('Người dùng đã tồn tại!', HttpStatus.CONFLICT);
    }
  }
}
