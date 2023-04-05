import { Controller, Get, Param, UseGuards, Post, Delete, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDataDTO } from './dto/user-data.dto';
import { RegisterUserData } from 'src/shared/interfaces/registerUserData';

@Controller('users')
export class UsersController {

  constructor(private _userService: UsersService) { }

  @UseGuards(AuthGuard)
  @Get("/")
  getAllUsers(): Promise<RegisterUserData[]> {
    return this._userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get("/user/:id")
  getUserById(@Param('id') id: string ): Promise<RegisterUserData> {
    return this._userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Post("/create")
  registerUser(@Body() userData: UserDataDTO) {
    return this._userService.createUser(userData);
  }
  
  @UseGuards(AuthGuard)
  @Put("/user/:id")
  updateUserById(@Param('id') id: string, @Body() userData: UserDataDTO ): any {
    return this._userService.updateUserById(id, userData);
  }
  
  @UseGuards(AuthGuard)
  @Delete("/user/:id")
  deleteUserById(@Param('id') id: string ): any {
    return this._userService.deleteUserById(id);
  }

}
