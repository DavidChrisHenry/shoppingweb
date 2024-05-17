import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ProductCheck } from './product.enity';

@Injectable()
export class ValidationProductPipe implements PipeTransform {
  async transform(value: any) {
    const user = plainToClass(ProductCheck, value);
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid user data');
    }
    return value;
  }
}
