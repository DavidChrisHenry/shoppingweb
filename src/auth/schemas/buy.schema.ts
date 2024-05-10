import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  ProductId: string;

  @Prop({ default: Date.now })
  time: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
