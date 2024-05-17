import { IsString, MinLength, MaxLength } from 'class-validator';

export class BuyProductCheck {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  ProductId: string;
}
