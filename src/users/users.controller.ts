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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  BaseResponse,
  ResStatus,
} from 'src/common/interfaces/base-response.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<
    BaseResponse & {
      data: User[];
    }
  > {
    const users = await this.usersService.findAll();
    return {
      status: ResStatus.SUCCESS,
      message: 'success',
      data: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const isUserExist = await this.usersService.findOneByEmail(
        createUserDto.email.toLowerCase().trim(),
      );
      console.log('isUserExist', isUserExist);

      if (isUserExist) {
        throw new HttpException('User already exists', 400);
      }

      const user = await this.usersService.create(createUserDto);
      // dont return password and salt
      delete user.password;
      delete user.salt;
      return user;
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.softDelete(id);
  }
}
