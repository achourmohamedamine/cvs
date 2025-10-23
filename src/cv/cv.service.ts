import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CreateCvDto } from './dto/create-cv.dto';
import { User } from '../user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { InjectRepository as InjectSkillRepository } from '@nestjs/typeorm';  

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>
  ) {}

  // 🔹 Créer un nouveau CV
  async create(createcvData: CreateCvDto): Promise<Cv> {
    const { userId, skillsIds, ...cvData } = createcvData;

    // Vérifier que l'utilisateur existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Créer le CV
    const cv = this.cvRepository.create({ ...cvData, user });

    // Ajouter les skills si fournis
    if (skillsIds && skillsIds.length > 0) {
      const skills = await this.skillRepository.findByIds(skillsIds);
      cv.skills = skills;
    }

    return await this.cvRepository.save(cv);
  }

  // 🔹 Récupérer tous les CVs
  async findAll(): Promise<Cv[]> {
    return await this.cvRepository.find();
  }

  // 🔹 Récupérer un CV par son id
  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
    return cv;
  }

  // 🔹 Mettre à jour un CV
  async update(id: number, updateData: UpdateCvDto): Promise<Cv> {
    const cv = await this.cvRepository.preload({
      id,
      ...updateData,
    });

    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }

    return await this.cvRepository.save(cv);
  }

  // 🔹 Supprimer un CV
  async remove(id: number): Promise<void> {
    const result = await this.cvRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
  }
}