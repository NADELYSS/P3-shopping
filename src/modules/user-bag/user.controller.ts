// src/modules/user/user.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') // /users 경로 관리
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 사용자 생성
  @Post()
  async createUser(@Body('username') username: string) {
    return this.userService.createUser(username);
  }

  // 사용자 ID로 조회
  @Get(':userId')
  async findUserById(@Param('userId') userId: string) {
    return this.userService.findUserById(userId);
  }

  // 찜 목록에 제품 추가
  @Post(':userId/wishlist/:productId')
  async addToWishlist(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.userService.addToWishlist(userId, productId);
  }

  // 장바구니에 제품 추가
  @Post(':userId/cart/:productId')
  async addToCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.userService.addToCart(userId, productId);
  }

  // 찜 목록 조회
  @Get(':userId/wishlist')
  async getWishlist(@Param('userId') userId: string) {
    return this.userService.getWishlist(userId);
  }

  // 장바구니 조회
  @Get(':userId/cart')
  async getCart(@Param('userId') userId: string) {
    return this.userService.getCart(userId);
  }
}
