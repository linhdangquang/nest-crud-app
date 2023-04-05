import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto';

@Injectable()
export class UsersService {
  //Injects the User repository into the service to be used to interact with the User entity/table
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //Finds all the Users in the User entity/table
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersRepository.find();
    const responseUsers: ResponseUserDto[] = ResponseUserDto.fromMany(users);
    return responseUsers;
  }

  //Finds one User in the User entity/table by their id
  async findOne(id: number): Promise<ResponseUserDto> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Finds one User in the User entity/table by their email
  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  //Creates a new User with the given data and persists it to the User entity/table
  async create(user: Partial<User>): Promise<ResponseUserDto> {
    const newUser = await this.usersRepository.save(
      this.usersRepository.create(user),
    );
    return ResponseUserDto.from(newUser);
  }

  //Updates a specific User in the User entity/table with the specified id and data
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id } });
  }

  //Soft deletes a specific User in the User entity/table by their id
  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
