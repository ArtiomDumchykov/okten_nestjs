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
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UserEntity } from '../database/entities/user.entity';
import { UserCreateProfileDto, UserCreateResponse } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiExtraModels(UserCreateResponse)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('/:userId')
  async getUserInfo(@Param() param: { userId: string }) {
    const user = await this.userService.getOneUser(param.userId);
    return user;
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
  @Post('/create')
  async createUser(
    @Body() body: UserCreateProfileDto,
    @Res() res: Response<any>,
  ) {
    const createdUser = await this.userService.createUser(body);
    return res.status(HttpStatus.CREATED).json(createdUser);
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
