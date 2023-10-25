import { Injectable } from '@nestjs/common';

import { UserCreateProfileDto } from './dto';

@Injectable()
export class UserService {
  private users: UserCreateProfileDto[] = [
    { id: '0', userName: 'Artem', age: 24, status: true },
  ];
  private count: number = 1;

  constructor() {}

  getUserHello(): string {
    return '<h1>Hello User</h1>';
  }
  async createUser(user: Omit<UserCreateProfileDto, 'id'>) {
    const id = this.count++;
    const createdUser = { id: id.toString(), ...user };
    this.users.push(createdUser);
    return createdUser;
  }
  async getOneUser(userId: string) {
    return this.users.find((item) => item.id === userId);
  }

  async getUsers() {
    return this.users;
  }

  async deletedUser(userId: string) {
    this.users = this.users.filter((item) => item.id !== userId);
  }
}
