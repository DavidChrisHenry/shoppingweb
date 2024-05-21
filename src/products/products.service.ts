import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BuyProductDto } from './dto/buy-product.dto';
import { BuyProduct } from './schemas/buyproducts.schema';
import { QueryProductDto } from './dto/query-product.dto';
import { CustomHttpException } from 'src/http_exceptions/custom-http-exception';
import mongoose from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
    @InjectModel('BuyProduct')
    private readonly BuyProductModel: Model<BuyProduct>,
  ) {}

  async findOne(id: string): Promise<Product> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomHttpException(
        'Invalid product ID!',
        { id },
        false,
        HttpStatus.BAD_REQUEST,
      );
    }
    const Product = await this.ProductModel.findById(id).exec();
    if (Product) {
      throw new CustomHttpException(
        'Find Product by Id Succeded',
        { Product },
        true,
        HttpStatus.OK, // (hoặc mã HTTP tùy chọn)
      );
    } else {
      throw new CustomHttpException(
        'Find Product by Id Unsucceded',
        { Product },
        false,
        HttpStatus.CONFLICT, // (hoặc mã HTTP tùy chọn)
      );
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.ProductModel(createProductDto);
    const addNewProduct = await newProduct.save();
    if (addNewProduct) {
      throw new CustomHttpException(
        'Create new product Succeded',
        { newProduct },
        true,
        HttpStatus.OK, // (hoặc mã HTTP tùy chọn)
      );
    } else {
      throw new CustomHttpException(
        'Create new product Fail',
        { newProduct },
        false,
        HttpStatus.CONFLICT, // (hoặc mã HTTP tùy chọn)
      );
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updateProduct = await this.ProductModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
      },
    );
    if (updateProduct) {
      throw new CustomHttpException(
        'Update product Succeded',
        { updateProduct },
        true,
        HttpStatus.OK, // (hoặc mã HTTP tùy chọn)
      );
    } else {
      throw new CustomHttpException(
        'Update product Unsucceded',
        { updateProduct },
        false,
        HttpStatus.CONFLICT, // (hoặc mã HTTP tùy chọn)
      );
    }
  }

  async delete(id: string): Promise<Product> {
    const deleteProduct = await this.ProductModel.findByIdAndDelete(id);
    if (deleteProduct) {
      throw new CustomHttpException(
        'Delete product Succeded',
        { deleteProduct },
        true,
        HttpStatus.OK, // (hoặc mã HTTP tùy chọn)
      );
    } else {
      throw new CustomHttpException(
        'Delete product Unsucceded because null of id product',
        { deleteProduct },
        false,
        HttpStatus.CONFLICT, // (hoặc mã HTTP tùy chọn)
      );
    }
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

    const Products = await this.ProductModel.find(query).exec();
    if (Products) {
      throw new CustomHttpException(
        'Find Product Succeded',
        { Products },
        true,
        HttpStatus.OK, // (hoặc mã HTTP tùy chọn)
      );
    } else {
      throw new CustomHttpException(
        'Find Product Unsucceded',
        { Products },
        false,
        HttpStatus.CONFLICT, // (hoặc mã HTTP tùy chọn)
      );
    }
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
