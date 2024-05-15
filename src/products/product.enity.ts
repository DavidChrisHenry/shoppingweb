import { IsString, MinLength, MaxLength, IsNumber, Min } from 'class-validator';

export class ProductCheck {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsNumber()
  @Min(1)
  Quantity: number;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  ProductId: string;

  @IsNumber()
  @Min(1000)
  Price: number;

  @IsString()
  @MinLength(10)
  @MaxLength(50)
  Description: string;
}
