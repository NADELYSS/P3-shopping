// src/modules/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { Product } from '../product/schemas/product.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, // User 모델
    @InjectModel(Product.name) private productModel: Model<Product>, // Product 모델
  ) {}

  // 사용자 생성
  async createUser(username: string): Promise<User> {
    const user = new this.userModel({ username });
    return user.save();
  }

  // 사용자 ID로 조회
  async findUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    return user;
  }

  // 찜 목록에 제품 추가
  async addToWishlist(userId: string, productId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');

    user.wishlist.push(product._id as Types.ObjectId);
    return user.save();
  }

  // 장바구니에 제품 추가
  async addToCart(userId: string, productId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');

    user.cart.push(product._id as Types.ObjectId);
    return user.save();
  }

  // 찜 목록 조회
  async getWishlist(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('wishlist', '_id name price imageUrl tags supplier')
      .exec();

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    return user.wishlist;
  }

  // 장바구니 목록 조회
  async getCart(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('cart', '_id name price imageUrl tags supplier')
      .exec();

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    return user.cart;
  }
}
