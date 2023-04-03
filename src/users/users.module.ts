import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserData, UserSchema } from '../shared/schemas/userData.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: UserData.name, schema: UserSchema
    }
  ])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService,
    MongooseModule.forFeature([
      {
        name: UserData.name, schema: UserSchema
      }
    ])
  ]
})
export class UsersModule {}
