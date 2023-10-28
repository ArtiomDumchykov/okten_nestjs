import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IList } from 'src/common/interface/list.interface';
import { UserEntity } from 'src/database/entities/user.entity';

import { UserListQueryRequestDto } from './dto/request/user-list.query.request.dto';
import { UserCreateProfileDto, UserUpdateDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private users = [];
  private count: number = 1;

  constructor(private readonly userRepository: UserRepository) {}

  getUserHello(): string {
    return '<h1>Hello User</h1>';
  }

  async getAllUsers(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    return await this.userRepository.getAllUsers(query);
  }

  async getUsersById(userId: string): Promise<UserEntity> {
    return await this.findUserByIdOrException(userId);
  }

  async createUser(userDto: UserCreateProfileDto) {
    const userEmail = userDto.email.trim();

    const findUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (findUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    try {
      const newUser = this.userRepository.create(userDto);

      if (!userDto.city) {
        newUser.city = 'Kharkiv';
      }

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException('Create user failed', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(userId: string, dto: UserUpdateDto): Promise<UserEntity> {
    const entity = await this.findUserByIdOrException(userId);

    this.userRepository.merge(entity, dto);
    return await this.userRepository.save(entity);
  }

  async deletedUser(userId: string): Promise<void> {
    const entity = await this.findUserByIdOrException(userId);
    await this.userRepository.remove(entity);
  }

  private async findUserByIdOrException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    }

    return user;
  }
}
