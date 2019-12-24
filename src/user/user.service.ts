import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    const { password, ...user } = await this.userRepository.findOne(id);
    return user;
  }

  create(user: CreateUserDto) {
    return this.userRepository.save(user);
  }
}
