import {
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Controller,
  HttpException,
  NotFoundException,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import {
  BaseResponse,
  ResStatus,
} from 'src/common/interfaces/base-response.interface';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto';
import AppHttpException from 'src/common/exception/AppHttpException';
import { EncryptionCrypto } from 'src/common/encryption/encryption-crypto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<
    BaseResponse & {
      data: ResponseUserDto[];
    }
  > {
    try {
      const users = await this.usersService.findAll();
      console.log('users', users);

      return {
        status: ResStatus.SUCCESS,
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseUserDto> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw AppHttpException.notFound('User not found');
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const isUserExist = await this.usersService.findOneByEmail(
        createUserDto.email.toLowerCase().trim(),
      );

      if (isUserExist) {
        throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
      }
      // encrypt password
      createUserDto.password = await EncryptionCrypto.encrypt(
        createUserDto.password,
      );
      return await this.usersService.create(createUserDto);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.softDelete(id);
  }
}
