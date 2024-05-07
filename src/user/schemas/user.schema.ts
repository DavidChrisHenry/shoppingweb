import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' }) // Đặt mặc định cho role là "user"
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
