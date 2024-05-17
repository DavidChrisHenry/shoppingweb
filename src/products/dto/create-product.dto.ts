import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly country?: string;

  @IsNumber()
  @IsOptional()
  readonly Quantity?: number;

  @IsString()
  readonly ProductId: string;

  @IsNumber()
  readonly Price: number;

  @IsString()
  @IsOptional()
  readonly Description?: string;
}
