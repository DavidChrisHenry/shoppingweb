import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Headers,
  Body,
  Param,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ValidationProductPipe } from './pipes/validation-product.pipe';
import { ValidationBuyProductPipe } from './pipes/validation-buyproduct.pipe';
import { BuyProductDto } from './dto/buy-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findProducts(
    @Query() queryProductDto: QueryProductDto,
  ): Promise<Product[]> {
    return this.productsService.findProducts(queryProductDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationProductPipe)
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.delete(id);
  }
}

@Controller('buy-products')
export class BuyProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationBuyProductPipe)
  async handleBuyProduct(
    @Body() buyProduct: BuyProductDto,
    @Headers('Authorization') authorizationHeader: string,
  ) {
    return this.productsService.handleBuyProduct(
      buyProduct,
      authorizationHeader,
    );
  }
}
