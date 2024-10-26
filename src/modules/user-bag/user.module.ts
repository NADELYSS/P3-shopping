import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Mongoose를 이용해 MongoDB 연결
import { UserService } from './user.service'; // 사용자 관련 서비스
import { UserController } from './user.controller'; // 사용자 관련 API 컨트롤러
import { User, UserSchema } from './schemas/user.schema'; // 사용자 스키마

@Module({
    imports: [
        // User 스키마를 MongoDB와 연결
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController], // User 관련 API 컨트롤러 등록
    providers: [UserService],
})
export class UserModule { }
