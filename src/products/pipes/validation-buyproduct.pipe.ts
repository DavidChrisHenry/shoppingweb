import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BuyProductCheck } from './buy-product.entity';
import { CustomHttpException } from 'src/http_exceptions/custom-http-exception';

@Injectable()
export class ValidationBuyProductPipe implements PipeTransform {
  async transform(value: any) {
    const userBuyProduct = plainToClass(BuyProductCheck, value);
    const errors = await validate(userBuyProduct);
    if (errors.length > 0) {
      throw new CustomHttpException(
        `Invalid user buy product data of ${errors}`,
        { userBuyProduct },
        false,
        HttpStatus.CONFLICT,
      );
    }
    return value;
  }
}
