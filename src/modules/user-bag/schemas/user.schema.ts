import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; // MongoDB Document 타입

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })  // 사용자 이름
    username: string;

    @Prop({ type: [{ type: Types.ObjectId }] })  // 찜 목록 (제품 ID만 저장)
    wishlist: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId }] })  // 장바구니 (제품 ID만 저장)
    cart: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
