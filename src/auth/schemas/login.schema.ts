import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Login {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
