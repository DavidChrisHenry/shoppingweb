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
    return await this.userService.checkExistingUser(user);
  }
}
