import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UserEntity } from '../../database/entities/user.entity';
import { UserListQueryRequestDto } from './dto/request/user-list.query.request.dto';
import { UserUpdateRequestDto } from './dto/request/user-update.request.dto';
import { UserDetailsResponseDto } from './dto/response/user-details.response.dto';
import { UserListResponseDto } from './dto/response/user-list-response.dto';
import { UserCreateProfileDto } from './dto/user.dto';
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get list of users' })
  @Get()
  async getAllUsers(
    @Query() query: UserListQueryRequestDto,
  ): Promise<UserListResponseDto> {
    const users = await this.userService.getAllUsers(query);
    return UserResponseMapper.toListDto(users, query);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':userId')
  async getUserInfo(
    @Param('userId') userId: string,
  ): Promise<UserDetailsResponseDto> {
    const user = await this.userService.getUsersById(userId);
    return UserResponseMapper.toDetailsDto(user);
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

  @ApiOperation({ summary: 'Update user by id' })
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UserUpdateRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const user = await this.userService.updateUser(userId, body);
    return UserResponseMapper.toDetailsDto(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    this.userService.deletedUser(userId);

    await this.userService.deletedUser(userId);
  }
}
