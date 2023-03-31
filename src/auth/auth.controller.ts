import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginData } from './dto/login-data.dto';
import { UserData } from './schemas/userData.schema';

@Controller('auth')
export class AuthController {

  constructor(private _authService: AuthService) { }

  @Get("/users")
  getAllUsers(): any {
    return this._authService.getUsers();
  }
  
  @Get("/user/:id")
  getUserById(@Param('id') id: string ): any {
    return this._authService.getUserById(id);
  }

  @Post("/login")
  checkLogin(@Body() loginData: LoginData): Promise<UserData> {
    return this._authService.validateUser(loginData);
  }
  
  @Post("/register")
  registerUser(@Body() userData: UserData) {
    return this._authService.createUser(userData);
  }
}
