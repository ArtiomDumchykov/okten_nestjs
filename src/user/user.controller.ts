import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UserCreateProfileDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('/:userId')
  async getUserInfo(@Param() param: { userId: string }) {
    const user = await this.userService.getOneUser(param.userId);
    return user;
  }

  @Post('/create')
  async createUser(
    @Body() body: Omit<UserCreateProfileDto, 'id'>,
    @Res() res: Response<UserCreateProfileDto>,
  ) {
    const createdUser = await this.userService.createUser(body);
    return res.status(HttpStatus.CREATED).json({ ...createdUser });
  }

  @Patch('/:userId')
  async updateUser() {}

  @Delete('/:userId')
  async deleteUser(
    @Param() param: { userId: string },
    @Res() res: Response<void>,
  ) {
    this.userService.deletedUser(param.userId);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
