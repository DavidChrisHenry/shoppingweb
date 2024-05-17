import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserCheck } from './user.entity';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any) {
    const user = plainToClass(UserCheck, value);
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid user data');
    }
    return value;
  }
}
