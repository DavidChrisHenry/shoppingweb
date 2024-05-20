import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return false; // Không có token JWT trong header, từ chối truy cập
    }

    const token = authorizationHeader.substring(7); // Lấy token từ header 'Authorization'
    try {
      const secretKey = process.env.jwtConstants;
      const decodedToken = this.jwtService.verify(token, { secret: secretKey });
      const userRole = decodedToken.role; // Lấy vai trò từ payload của token
      return userRole === 'admin'; // Chỉ cho phép truy cập nếu vai trò là 'admin'
    } catch (error) {
      console.log(error);
      return false; // Nếu có lỗi khi giải mã token, từ chối truy cập
    }
  }
}
