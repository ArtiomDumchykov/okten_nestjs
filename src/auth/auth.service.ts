import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuthHello(): string {
    return '<h1>Hello Auth</h1>';
  }
}
