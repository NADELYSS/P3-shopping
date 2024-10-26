import { Controller, Post, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')  // /users 경로 관리
export class UserController {
    constructor(private readonly userService: UserService) { }

    // 찜 목록에 제품 추가 API
    @Post(':userId/wishlist/:productId')
    addToWishlist(
        @Param('userId') userId: string, // 사용자 ID
        @Param('productId') productId: string, // 제품 ID
    ) {
        return this.userService.addToWishlist(userId, productId); // 서비스 호출
    }

    // 장바구니에 제품 추가 API
    @Post(':userId/cart/:productId')
    addToCart(
        @Param('userId') userId: string, // 사용자 ID
        @Param('productId') productId: string, // 제품 ID
    ) {
        return this.userService.addToCart(userId, productId); // 서비스 호출
    }

    @Get()
    gettest(): string {
        console.log('확인 log');
        return;
    }
}

// @Controller('log')
// export class testController {
//     @Get()
//     gettest(): string {
//         console.log('확인 log');
//         return;
//     }
// }