import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(parseInt(id, 10));
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }
}
