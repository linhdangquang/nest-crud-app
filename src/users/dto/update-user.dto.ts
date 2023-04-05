import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  salt: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  deletedAt: Date;
}
