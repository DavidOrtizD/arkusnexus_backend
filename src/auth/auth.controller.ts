import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginData } from './dto/login-data.dto';
import { RegisterData } from './dto/register-data.dto';
import { UserDataInterface } from '../../dist/auth/interfaces/UserData';


@Controller('auth')
export class AuthController {

  constructor(private _authService: AuthService) { }

  @Post("/login")
  checkLogin(@Body() loginData: LoginData): Promise<{usrData:UserDataInterface, access_token:string}> {
    return this._authService.validateUser(loginData);
  }
  
  @Post("/register")
  registerUser(@Body() userData: RegisterData) {
    return this._authService.createUser(userData);
  }
}
