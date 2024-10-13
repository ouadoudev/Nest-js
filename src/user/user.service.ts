import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as argon2 from 'argon2';
import { AuthDto } from 'src/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password, {
        type: argon2.argon2id,
      });
    }
    await this.userRepository.update(existingUser.id, updateUserDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
  }
}
