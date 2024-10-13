import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/user';
import { CreateUserDto } from './user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon2.hash(createUserDto.password, {
      type: argon2.argon2id,
    });
    const userToCreate = {
      ...createUserDto,
      password: hashedPassword,
    };

    const user = this.userRepository.create(userToCreate);
    return await this.userRepository.save(user);
  }
  async update(id: number, updatedUser: Partial<User>): Promise<void> {
    await this.userRepository.update(id, updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
