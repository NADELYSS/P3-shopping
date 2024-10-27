// src/modules/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; // NestJS와 Mongoose 관련 모듈 임포트
import { Document, Types } from 'mongoose'; // MongoDB Document와 ObjectId 타입
import { Product } from 'src/modules/product/schemas/product.schema'; // Product 스키마 참조

@Schema() // MongoDB에 저장될 스키마로 지정
export class User extends Document {
    @Prop({ required: true, unique: true }) // 필수 값이면서 고유한 사용자 이름
    username: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] }) // Product 컬렉션과 참조
    wishlist: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] }) // 장바구니에도 Product 참조
    cart: Types.ObjectId[];
}

// User 클래스에 해당하는 Mongoose 스키마 생성
export const UserSchema = SchemaFactory.createForClass(User);
