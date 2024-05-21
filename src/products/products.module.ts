import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './schemas/product.schema';
import { BuyProductSchema } from './schemas/buyproducts.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: 'BuyProduct', schema: BuyProductSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, JwtService],
})
export class ProductsModule {}
