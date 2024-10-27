// src/modules/product/product.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products') // /products 경로에 대한 컨트롤러
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    // 상품 등록 엔드포인트
    @Post()
    async createProduct(@Body() createProductDto: any) {
        return this.productService.createProduct(createProductDto); // 상품 생성 서비스 호출
    }

    // 모든 상품 조회 엔드포인트
    @Get()
    async findAll() {
        return this.productService.findAll(); // 모든 상품 조회 서비스 호출
    }
}
