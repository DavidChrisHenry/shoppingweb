import { IsString, MinLength, MaxLength } from 'class-validator';

export class UserCheck {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
