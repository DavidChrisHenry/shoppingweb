import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
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
