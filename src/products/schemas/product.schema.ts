import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  Quantity: number;

  @Prop()
  ProductId: string;

  @Prop()
  Price: number;

  @Prop()
  Description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
