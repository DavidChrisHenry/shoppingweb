import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomHttpException } from 'src/http_exceptions/custom-http-exception';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
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

    const token = authorizationHeader.substring(7); // Lấy token từ header 'Authorization'
    try {
      const secretKey = process.env.JWT_SECRET; // Đảm bảo biến môi trường này đã được định nghĩa
      const decodedToken = this.jwtService.verify(token, { secret: secretKey });
      const userRole = decodedToken.role; // Lấy vai trò từ payload của token

      if (userRole !== 'admin') {
        throw new CustomHttpException(
          'Access denied!',
          { reason: 'User does not have the necessary permissions' },
          false,
          HttpStatus.FORBIDDEN,
        );
      }

      return true; // Cho phép truy cập nếu vai trò là 'admin'
    } catch (error) {
      throw new CustomHttpException(
        'Access denied!',
        { reason: 'Invalid or expired token' },
        false,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
