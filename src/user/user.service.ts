import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { CustomHttpException } from 'src/http_exceptions/custom-http-exception';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const isUsernameTaken = await this.isUsernameTaken(
      registerUserDto.username,
    );

    if (isUsernameTaken) {
      throw new CustomHttpException(
        'User already exists!',
        'Additional data',
        false,
        HttpStatus.CONFLICT,
      );
    }

    const addUser = new this.UserModel(registerUserDto);
    return addUser.save();
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.UserModel.findOne({ username });
    return !!user;
  }

  async checkExistingUser(registerUserDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.findUser(registerUserDto.username);
    if (!existingUser) {
      this.createUser(registerUserDto);

      throw new CustomHttpException(
        'Register Succeeded',
        { user: registerUserDto },
        true,
        HttpStatus.OK, // (hoặc mã HTTP tùy chọn)
      );
    } else {
      existingUser.password = undefined;
      throw new CustomHttpException(
        'User already exists!',
        { existingUser },
        false,
        HttpStatus.CONFLICT,
      );
    }
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.UserModel.findOne({ username });
    return user;
  }
}
