import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false; // Không có header xác thực
    }

    const token = authHeader.split(' ')[1]; // Lấy token từ "Bearer <token>"
    console.log(token);
    try {
      const decoded = await this.jwtService.verifyAsync(token); // Xác thực JWT
      request.user = decoded; // Lưu thông tin người dùng vào request
      console.log(request.user);
      return true; // JWT hợp lệ, cho phép truy cập
    } catch (err) {
      console.error('Error occurred:', err);
      return false;
    }
  }
}
