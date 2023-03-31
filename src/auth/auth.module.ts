import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserData } from './schemas/userData.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: UserData.name, schema: UserSchema
    }
  ])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
