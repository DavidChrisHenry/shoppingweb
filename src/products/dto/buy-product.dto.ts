import { IsOptional, IsString } from 'class-validator';

export class BuyProductDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  readonly ProductId: string;

  @IsString()
  @IsOptional()
  Quantity: string;
}
