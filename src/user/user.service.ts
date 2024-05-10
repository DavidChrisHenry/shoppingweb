import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const addUser = new this.UserModel(user);
    return await addUser.save();
  }

  async findUser(username: string): Promise<User | undefined> {
    // Sử dụng đối tượng truy vấn thay vì hàm bậc cao
    const user = await this.UserModel.findOne({ username }); // Tìm một người dùng với username cụ thể
    return user;
  }
}
