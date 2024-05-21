import { Injectable, HttpStatus, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomHttpException } from 'src/http_exceptions/custom-http-exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new CustomHttpException(
        'Access denied!',
        { reason: 'No JWT token found in the Authorization header' },
        false,
        HttpStatus.FORBIDDEN,
      );
    }

    if (err || !user) {
      throw new CustomHttpException(
        'Access denied!',
        { reason: 'User does not have the necessary permissions' },
        false,
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }
}
