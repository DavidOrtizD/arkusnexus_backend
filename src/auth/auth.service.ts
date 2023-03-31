import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginData } from './dto/login-data.dto';
import { UserDataInterface } from './interfaces/UserData';
import { UserData } from './schemas/userData.schema';

@Injectable()
export class AuthService {

  constructor( @InjectModel(UserData.name) private userModel: Model<UserData>) {}
  
  async getUser(data: LoginData): Promise<UserData> {
    const {email} = data;
    
    const currentUser = await this.getUserByProperty("email", email);
    
    if(currentUser) {
      return currentUser;
    } else {
      throw new  HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
  
  async getUsers(): Promise<UserData[]> {
    return this.userModel.find();
  }
  
  async getUserById(uid: string): Promise<UserData> {
    return this.userModel.findById(uid);
  }
  
  async getUserByProperty(property: string, propertyValue: string): Promise<UserData> {
    return this.userModel.findOne({ [property]: propertyValue });
  }
  
  async createUser(data: UserDataInterface) {
    try {
        const createdUser = new this.userModel(data);
        const user = await createdUser.save();

        return {
          status: HttpStatus.CREATED, data: [user]
        }
    } catch(e) {
        throw new BadRequestException({ cause: e, description: 'Some error description' }, 'Something bad happened');
    }
  }

  async validateUser(loginData: LoginData): Promise<UserData> {
    const userData = await this.getUser(loginData);
    const {password} = userData; 
    
    if(password === loginData.password){
      return userData;
    } else {
      throw new  HttpException('Forbiden Access', HttpStatus.FORBIDDEN);
    }
  }
}
