import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserData } from '../shared/schemas/userData.schema';

@Injectable()
export class UsersService {

  constructor( @InjectModel(UserData.name) private userModel: Model<UserData>) {}

  async getUsers(): Promise<UserData[]> {
    return this.userModel.find();
  }
  
  async getUserById(uid: string): Promise<UserData> {
    return this.userModel.findById(uid);
  }
  
  async getUserByProperty(property: string, propertyValue: string): Promise<UserData> {
    return this.userModel.findOne({ [property]: propertyValue });
  }
}
