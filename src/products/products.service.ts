import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BuyProductDto } from './dto/buy-product.dto';
import { BuyProduct } from './schemas/buyproducts.schema';
import { QueryProductDto } from './dto/query-product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
    @InjectModel('BuyProduct')
    private readonly BuyProductModel: Model<BuyProduct>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.ProductModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.ProductModel.findById(id).exec();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.ProductModel(createProductDto);
    return newProduct.save();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.ProductModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Product> {
    return this.ProductModel.findByIdAndDelete(id);
  }

  async findProducts(filters: QueryProductDto): Promise<Product[]> {
    const query: Record<string, any> = {};

    const { minPrice, maxPrice, country, Price, ProductId, name } = filters;

    if (minPrice !== undefined) {
      const parsedMinPrice = Number(minPrice);
      if (isNaN(parsedMinPrice)) {
        throw new BadRequestException('Invalid minPrice');
      }
      query.Price = { ...query.Price, $gte: parsedMinPrice };
    }

    if (maxPrice !== undefined) {
      const parsedMaxPrice = Number(maxPrice);
      if (isNaN(parsedMaxPrice)) {
        throw new BadRequestException('Invalid maxPrice');
      }
      query.Price = { ...query.Price, $lte: parsedMaxPrice };
    }

    if (country) {
      query.country = country;
    }

    if (ProductId) {
      query.ProductId = ProductId;
    }

    if (Price) {
      query.Price = Price;
    }

    if (name) {
      query.name = name;
    }

    return this.ProductModel.find(query).exec();
  }

  // lấy username từ token để xử lý mua hàng
  async buyProduct(username: string, buyProduct: BuyProductDto) {
    buyProduct.username = username;
    const newBuyProduct = new this.BuyProductModel(buyProduct);
    return newBuyProduct.save();
  }

  async handleBuyProduct(buyProduct: BuyProductDto, username: string) {
    return this.buyProduct(username, buyProduct);
  }
}
