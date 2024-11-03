// src/modules/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true }) // 고유한 사용자 이름
  username: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] }) // 찜 목록
  wishlist: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] }) // 장바구니 목록
  cart: Types.ObjectId[];
}

// User 스키마 생성
export const UserSchema = SchemaFactory.createForClass(User);
