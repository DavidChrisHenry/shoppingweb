import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';

import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() user: User) {
    // Đảm bảo rằng bạn đang sử dụng @Body() để lấy dữ liệu
    const existingUser = await this.userService.findUser(user.username);

    if (!existingUser) {
      return await this.userService.create(user);
    } else {
      throw new HttpException('Người dùng đã tồn tại!', HttpStatus.CONFLICT);
    }
  }
}
