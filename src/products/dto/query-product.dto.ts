import { IsOptional, IsString, IsNumber } from 'class-validator';

export class QueryProductDto {
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  Price?: string;

  @IsOptional()
  @IsString()
  ProductId?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
