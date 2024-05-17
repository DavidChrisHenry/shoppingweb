import { IsString } from 'class-validator';

export class BuyProductDto {
  @IsString()
  username: string;

  @IsString()
  readonly ProductId: string;

  @IsString()
  Quantity: string;
}
