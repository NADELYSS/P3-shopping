// src/modules/product/product.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 제품 생성
  @Post()
  async createProduct(@Body() createProductDto: any) {
    return this.productService.createProduct(createProductDto);
  }

  // 제품 ID로 조회
  @Get(':productId')
  async findProductById(@Param('productId') productId: string) {
    return this.productService.findProductById(productId);
  }
}
