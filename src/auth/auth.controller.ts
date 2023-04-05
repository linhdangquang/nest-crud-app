import { AuthService } from 'src/auth/auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/sign-int.dto';
import { ResponseUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { EncryptionCrypto } from 'src/common/encryption/encryption-crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: SignInDto): Promise<any> {
    try {
      const user = await this.authService.validateUser(
        body.email,
        body.password,
      );
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }
      return {
        status: 'success',
        message: 'User logged in successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: SignUpDto): Promise<any> {
    try {
      const isUserExist = await this.usersService.findOneByEmail(
        body.email.toLowerCase().trim(),
      );
      if (isUserExist) {
        throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
      }
      const encryptedPassword = await EncryptionCrypto.encrypt(body.password);
      await this.usersService.create({
        ...body,
        password: encryptedPassword,
      });
      return {
        status: 'success',
        message: 'User registered successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
