import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.ProductModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.ProductModel.findById(id).exec();
  }

  async create(post: Product): Promise<Product> {
    const newPost = new this.ProductModel(post);
    return newPost.save();
  }

  async update(id: string, post: Product): Promise<Product> {
    return this.ProductModel.findByIdAndUpdate(id, post, { new: true });
  }

  async delete(id: string): Promise<Product> {
    return this.ProductModel.findByIdAndDelete(id);
  }

  async findProducts(filters: Record<string, any>): Promise<Product[]> {
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
}
