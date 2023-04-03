import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginData } from './dto/login-data.dto';
import { RegisterData } from './dto/register-data.dto';
import { UserData } from '../shared/schemas/userData.schema';


@Controller('auth')
export class AuthController {

  constructor(private _authService: AuthService) { }

  @Post("/login")
  checkLogin(@Body() loginData: LoginData): Promise<UserData> {
    return this._authService.validateUser(loginData);
  }
  
  @Post("/register")
  registerUser(@Body() userData: RegisterData) {
    return this._authService.createUser(userData);
  }
}
