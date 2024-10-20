import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Types로 ObjectId 타입 처리
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    // 찜 목록에 제품 추가
    async addToWishlist(userId: string, productId: string) {
        const user = await this.userModel.findById(userId); // 사용자 찾기
        if (!user) throw new NotFoundException('사용자를 찾을 수 없음');

        // 문자열로 전달된 productId를 ObjectId로 변환
        const productObjectId = new Types.ObjectId(productId);

        user.wishlist.push(productObjectId); // ObjectId 추가
        return user.save(); // MongoDB에 저장
    }

    // 장바구니에 제품 추가
    async addToCart(userId: string, productId: string) {
        const user = await this.userModel.findById(userId); // 사용자 찾기
        if (!user) throw new NotFoundException('사용자를 찾을 수 없음');

        // 문자열로 전달된 productId를 ObjectId로 변환
        const productObjectId = new Types.ObjectId(productId);

        user.cart.push(productObjectId); // ObjectId 추가
        return user.save(); // MongoDB에 저장
    }
}
