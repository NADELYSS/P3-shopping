// src/modules/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    // 상품 생성 메서드
    async createProduct(createProductDto: any): Promise<Product> {
        const product = new this.productModel(createProductDto); // 새 상품 인스턴스 생성
        return product.save(); // MongoDB에 저장
    }

    // 모든 상품 조회 메서드
    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec(); // 모든 상품 조회
    }
}
