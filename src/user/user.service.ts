import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserCreateProfileDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private users = [];
  private count: number = 1;

  constructor(private readonly userRepository: UserRepository) {}

  getUserHello(): string {
    return '<h1>Hello User</h1>';
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
  async getOneUser(userId: string) {
    return this.users.find((item) => item?.id === userId);
  }

  async getUsers() {
    return this.users;
  }

  async deletedUser(userId: string) {
    this.users = this.users.filter((item) => item?.id !== userId);
  }
}
