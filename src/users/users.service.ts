import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserData } from '../shared/schemas/userData.schema';
import { UserDataInterface } from '../shared/interfaces/UserData';

@Injectable()
export class UsersService {

  constructor( @InjectModel(UserData.name) private userModel: Model<UserData>) {}

  async getUsers(): Promise<UserData[]> {
    return this.userModel.find();
  }
  
  async getUserById(uid: string): Promise<UserData> {
    return this.userModel.findById(uid);
  }
  
  async getUserByProperty(property: string, propertyValue: string): Promise<UserDataInterface> {
    return this.userModel.findOne({ [property]: propertyValue });
  }
  
  async getUserByPropertyInternal(property: string, propertyValue: string): Promise<UserData> {
    return this.userModel.findOne({ [property]: propertyValue });
  }

  async updateUserById(uid: string, usrData: UserDataInterface): Promise<any> {
    try {
      return this.userModel.updateOne({_id:uid}, { ...usrData });
    } catch {
      throw new  HttpException('User Not Updated.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async deleteUserById(uid: string): Promise<any> {
    try {
      return this.userModel.deleteOne({_id: uid});
    } catch {
      throw new  HttpException('User Not Deleted.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}
