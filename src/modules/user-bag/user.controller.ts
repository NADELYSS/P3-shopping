// src/modules/user/user.controller.ts
import { Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') // /users 경로 관리
export class UserController {
    constructor(private readonly userService: UserService) { }

    // 찜 목록에 제품 추가 API
    @Post(':userId/wishlist/:productId')
    async addToWishlist(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        return this.userService.addToWishlist(userId, productId);
    }

    // 장바구니에 제품 추가 API
    @Post(':userId/cart/:productId')
    async addToCart(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        return this.userService.addToCart(userId, productId);
    }

    // 찜 목록 조회 API
    @Get(':userId/wishlist')
    async getWishlist(@Param('userId') userId: string) {
        return this.userService.getWishlist(userId); // 서비스에서 찜 목록 가져오기
    }

    // 장바구니 목록 조회 API
    @Get(':userId/cart')
    async getCart(@Param('userId') userId: string) {
        return this.userService.getCart(userId); // 서비스에서 장바구니 가져오기
    }
}
