import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly role: string;
}
