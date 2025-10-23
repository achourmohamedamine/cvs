import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
