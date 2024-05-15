import {
  Headers,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { BuyProduct } from './schemas/buyproducts.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.login(req.user, req);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    return await this.authService.logout(req);
  }

  @Post('buy-products')
  @UseGuards(JwtAuthGuard)
  async handleBuyProduct(
    @Body() buyProduct: BuyProduct,
    @Headers('Authorization') authorizationHeader: string,
  ) {
    const access_token = this.extractToken(authorizationHeader);
    return await this.authService.handleBuyProduct(access_token, buyProduct);
  }
  private extractToken(authorizationHeader: string): string {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new Error('Invalid Authorization header');
    }
    return authorizationHeader.substring(7);
  }
}
