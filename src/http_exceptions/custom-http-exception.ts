import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(
    message: string,
    data: {},
    isSuccess: boolean,
    statusCode: HttpStatus,
  ) {
    super({ statusCode, message, data, isSuccess }, statusCode);
  }
}
