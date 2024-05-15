import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const isUsernameTaken = await this.isUsernameTaken(user.username);

    if (isUsernameTaken) {
      throw new HttpException('Người dùng đã tồn tại!', HttpStatus.CONFLICT);
    }

    const addUser = new this.UserModel(user);
    return await addUser.save();
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.UserModel.findOne({ username });
    return !!user;
  }

  async checkExistingUser(user: User): Promise<User> {
    const existingUser = await this.findUser(user.username);
    if (!existingUser) {
      return this.createUser(user);
    } else {
      throw new HttpException('Người dùng đã tồn tại!', HttpStatus.CONFLICT);
    }
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.UserModel.findOne({ username });
    return user;
  }
}
