import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly country?: string;

  @IsNumber()
  @IsOptional()
  readonly Quantity?: number;

  @IsString()
  @IsOptional()
  readonly ProductId?: string;

  @IsNumber()
  @IsOptional()
  readonly Price?: number;

  @IsString()
  @IsOptional()
  readonly Description?: string;
}
