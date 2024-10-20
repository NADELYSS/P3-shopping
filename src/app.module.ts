import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user-bag/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/shopping-app'),
    UserModule,
  ],
})
export class AppModule {}
