import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BuyProductCheck } from './buy-product.entity';

@Injectable()
export class ValidationBuyProductPipe implements PipeTransform {
  async transform(value: any) {
    const user = plainToClass(BuyProductCheck, value);
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid user data');
    }
    return value;
  }
}
