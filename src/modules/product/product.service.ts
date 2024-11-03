// src/modules/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  // 제품 생성 메서드
  async createProduct(createProductDto: any): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save(); // MongoDB에 저장
  }

  // 제품 ID로 조회 메서드
  async findProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');
    return product;
  }
}
