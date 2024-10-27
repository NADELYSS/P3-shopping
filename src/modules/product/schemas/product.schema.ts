// src/modules/product/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({ required: true }) // 필수: 상품 이름
    name: string;

    @Prop({ required: true }) // 필수: 상품 가격
    price: number;

    @Prop({ required: false }) // 필수: 이미지 파일 URL
    image: string;

    @Prop({ type: [String] }) // 상품 태그
    tags: string[];

    @Prop({ required: true }) // 필수: 상품 공급사
    supplier: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
