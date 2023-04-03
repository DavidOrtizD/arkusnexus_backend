import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private _userService: UsersService) { }

  @Get("/")
  getAllUsers(): any {
    return this._userService.getUsers();
  }
  
  @Get("/user/:id")
  getUserById(@Param('id') id: string ): any {
    return this._userService.getUserById(id);
  }

}
