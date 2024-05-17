import { IsString } from 'class-validator';

export class BuyProductDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly ProductId: string;
}
