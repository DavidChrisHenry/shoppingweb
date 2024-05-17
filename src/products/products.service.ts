import { Injectable } from '@nestjs/common';
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
    return this.ProductModel.find(filters).exec();
  }
}
