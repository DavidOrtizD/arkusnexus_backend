import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginData } from './dto/login-data.dto';
import { UserDataInterface } from '../shared/interfaces/UserData';
import { UserData } from '../shared/schemas/userData.schema';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor( @InjectModel(UserData.name) private userModel: Model<UserData>, private _userService: UsersService, private jwtService: JwtService) {}
  
  async checkUser(data: LoginData): Promise<UserData> {
    const {email} = data;
    
    const currentUser = await this._userService.getUserByPropertyInternal("email", email);
    
    if(currentUser) {
      return currentUser;
    } else {
      throw new  HttpException('User Not Found.', HttpStatus.UNAUTHORIZED);
    }
  }
  
  async createUser(data: UserDataInterface) {
    try {
        data.role = 'user';
        data.team = null;
        data.cv = null;
        data.englishLevel = null;
        data.techSkills = null;

        const {email} = data;
        const user = await this._userService.getUserByProperty("email", email);
        
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

  async validateUser(loginData: LoginData): Promise<{usrData:UserDataInterface, access_token:string}> {
    const userData = await this.checkUser(loginData);
    const {password, email} = userData; 
    
    if(password === loginData.password){
        const usr = await  this._userService.getUserByProperty("email", email);
        const payload = {username: usr.name, sub: usr.uid};
      
       return { usrData: usr, access_token: await this.jwtService.signAsync(payload) }
    } else {
      throw new  HttpException('Forbiden Access', HttpStatus.FORBIDDEN);
    }
  }
}
