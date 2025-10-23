import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { BaseController } from '../common/base.controller';

@Controller('users')
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}

