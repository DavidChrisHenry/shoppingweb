import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ProductCheck } from './product.enity';
import { CustomHttpException } from 'src/http_exceptions/custom-http-exception';

@Injectable()
export class ValidationProductPipe implements PipeTransform {
  async transform(value: any) {
    const product = plainToClass(ProductCheck, value);
    const errors = await validate(product);
    if (errors.length > 0) {
      throw new CustomHttpException(
        `Invalid product data of ${errors}`,
        { product },
        false,
        HttpStatus.CONFLICT,
      );
    }
    return value;
  }
}
