import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateProfileDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty({ readOnly: true, example: 'test@example.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false, example: 'Kharkiv' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}

export class UserUpdateDto {}

export class UserCreateResponse extends UserCreateProfileDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}
