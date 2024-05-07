import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get() // Endpoint cho lọc
  async findProducts(
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('country') country?: string,
    @Query('Price') Price?: string,
    @Query('ProductId') ProductId?: string,
    @Query('name') name?: string,
  ): Promise<Product[]> {
    const filters: Record<string, any> = {};

    // Kiểm tra minPrice và đảm bảo nó là số hợp lệ
    if (minPrice !== undefined) {
      const parsedMinPrice = minPrice;
      if (isNaN(parsedMinPrice)) {
        throw new BadRequestException('Invalid minPrice'); // Nếu không hợp lệ, trả về lỗi 400
      }
      filters.Price = { ...filters.Price, $gte: parsedMinPrice };
    }

    // Kiểm tra maxPrice và đảm bảo nó là số hợp lệ
    if (maxPrice !== undefined) {
      const parsedMaxPrice = maxPrice;
      if (isNaN(parsedMaxPrice)) {
        throw new BadRequestException('Invalid maxPrice');
      }
      filters.Price = { ...filters.Price, $lte: parsedMaxPrice };
    }

    // Xử lý tham số country nếu có
    if (country) {
      filters.country = country;
    }

    if (ProductId) {
      filters.ProductId = ProductId;
    }

    if (Price) {
      filters.Price = Price;
    }

    if (name) {
      filters.name = name;
    }

    return this.productsService.findProducts(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return await this.productsService.create(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    return await this.productsService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.productsService.delete(id);
  }
}
