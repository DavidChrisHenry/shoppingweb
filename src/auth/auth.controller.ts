import {
  Headers,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BuyProduct } from './schemas/buyproducts.schema';
import { ValidationBuyProductPipe } from './pipes/validation-buyproduct.pipe';

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
  @UsePipes(ValidationBuyProductPipe)
  async handleBuyProduct(
    @Body() buyProduct: BuyProduct,
    @Headers('Authorization') authorizationHeader: string,
  ) {
    return this.authService.handleBuyProduct(buyProduct, authorizationHeader);
  }
}
