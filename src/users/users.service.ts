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

  async createUser(data: UserDataInterface) {
    try {
        const {email} = data;
        const user = await this.getUserByProperty("email", email);
        
        // If user does not exist create a new one for register
        if(!user) {
          const createdUser = new this.userModel(data);
          const user = await createdUser.save();

          return {
            status: HttpStatus.CREATED, data: [user]
          }
        } else {
          // If user exists throw an error
          throw new  HttpException('User Already Exists.', HttpStatus.BAD_REQUEST);
        }
        
    } catch(e) {
      if(e.status != 400) {
        throw new  HttpException('Something wrong happened.', HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new  HttpException('User Already Exists.', HttpStatus.BAD_REQUEST);
      }
      
    }
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
