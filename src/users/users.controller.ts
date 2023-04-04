import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('users')
export class UsersController {

  constructor(private _userService: UsersService) { }

  @UseGuards(AuthGuard)
  @Get("/")
  getAllUsers(): any {
    return this._userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get("/user/:id")
  getUserById(@Param('id') id: string ): any {
    return this._userService.getUserById(id);
  }

}
