import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const isUsernameTaken = await this.isUsernameTaken(
      registerUserDto.username,
    );

    if (isUsernameTaken) {
      throw new HttpException('Người dùng đã tồn tại!', HttpStatus.CONFLICT);
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
      return this.createUser(registerUserDto);
    } else {
      throw new HttpException('Người dùng đã tồn tại!', HttpStatus.CONFLICT);
    }
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.UserModel.findOne({ username });
    return user;
  }
}
