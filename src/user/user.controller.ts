import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Post, Body, Query } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { error } from 'console';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Get()
  async findProducts(
    @Query('username') username?: string,
    @Query('password') password?: string,
  ): Promise<User[]> {
    const filters: Record<string, any> = {};

    // Xử lý tham số country nếu có
    if (username) {
      filters.username = username;
    }

    if (password) {
      filters.password = password;
    }

    if (!(username && password)) {
      throw error('Not Accepted!');
    }

    return this.userService.findUser(filters);
  }
}
