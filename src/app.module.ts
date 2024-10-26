import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user-bag/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nadelyss:1205@shopping.ticjj.mongodb.net/?retryWrites=true&w=majority&appName=shopping'),
    UserModule,
  ],
})
export class AppModule {}
