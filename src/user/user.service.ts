import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 🔹 Créer un nouvel utilisateur
  async create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  // 🔹 Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // 🔹 Récupérer un utilisateur par son id
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // 🔹 Mettre à jour un utilisateur
  async update(@Param('id', ParseIntPipe) id : number, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateData,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.save(user);
  }

  // 🔹 Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
