// src/modules/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // ObjectId 사용을 위해 Types 임포트
import { User } from './schemas/user.schema';
import { Product } from '../product/schemas/product.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>, // User 모델 주입
        @InjectModel(Product.name) private productModel: Model<Product>, // Product 모델 주입
    ) { }

    // 사용자 찜 목록에 제품 추가
    async addToWishlist(userId: string, productId: string) {
        const user = await this.userModel.findById(userId); // 사용자 찾기
        if (!user) throw new NotFoundException('사용자 찾을 수 없음.'); // 사용자 없으면 예외 처리

        const productObjectId = new Types.ObjectId(productId); // ObjectId 변환
        const product = await this.productModel.findById(productObjectId); // 제품 찾기
        if (!product) throw new NotFoundException('제품 찾을 수 없음.'); // 제품 없으면 예외 처리

        user.wishlist.push(product._id); // 찜 목록에 제품 ID 추가
        return user.save(); // 저장 후 사용자 반환
    }

    // 사용자 장바구니에 제품 추가
    async addToCart(userId: string, productId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('사용자 찾을 수 없음.');

        const productObjectId = new Types.ObjectId(productId);
        const product = await this.productModel.findById(productObjectId);
        if (!product) throw new NotFoundException('제품 찾을 수 없음.');

        user.cart.push(product._id); // 장바구니에 제품 ID 추가
        return user.save(); // 저장 후 사용자 반환
    }

    // 찜 목록 조회 (Product 정보 포함)
    async getWishlist(userId: string) {
        const user = await this.userModel
            .findById(userId) // 사용자 찾기
            .populate('wishlist', '_id name price imageUrl tags supplier') // Product 필드 명시
            .exec();
        if (!user) throw new NotFoundException('사용자 찾을 수 없음.'); // 사용자 없으면 예외

        return user.wishlist; // 찜 목록 반환
    }

    // 장바구니 목록 조회 (Product 정보 포함)
    async getCart(userId: string) {
        const user = await this.userModel
            .findById(userId)
            .populate('cart', '_id name price imageUrl tags supplier') // Product 필드 명시
            .exec();
        if (!user) throw new NotFoundException('사용자 찾을 수 없음.');

        return user.cart; // 장바구니 목록 반환
    }
}
