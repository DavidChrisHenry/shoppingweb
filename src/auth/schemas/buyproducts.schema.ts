import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class BuyProduct {
  @Prop()
  username: string;

  @Prop()
  ProductId: string;
}

export const BuyProductSchema = SchemaFactory.createForClass(BuyProduct);
