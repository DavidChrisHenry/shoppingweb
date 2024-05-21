import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomHttpException } from 'src/http_exceptions/custom-http-exception';

@Injectable()
export class QueryValidationMiddleware implements NestMiddleware {
  private validQueries = [
    'minPrice',
    'maxPrice',
    'country',
    'ProductId',
    'name',
    'Price',
  ]; // Danh sách các query hợp lệ

  use(req: Request, res: Response, next: NextFunction) {
    const queryKeys = Object.keys(req.query);

    // Kiểm tra xem có bất kỳ query nào không hợp lệ hay không
    const invalidQueries = queryKeys.filter(
      (key) => !this.validQueries.includes(key),
    );

    if (invalidQueries.length > 0) {
      throw new CustomHttpException(
        `Invalid query parameters: ${invalidQueries.join(', ')}`,
        {},
        false,
        HttpStatus.CONFLICT,
      );
    }

    next(); // Tiếp tục xử lý yêu cầu
  }
}
