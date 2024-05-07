import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const addUser = new this.UserModel(user);
    return await addUser.save();
  }

  async findUser(filters: Record<string, any>): Promise<User[]> {
    return await this.UserModel.find(filters).exec();
  }
}
