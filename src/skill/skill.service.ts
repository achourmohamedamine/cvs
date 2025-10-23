import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  // 🔹 Créer une nouvelle compétence
  async create(skillData: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(skillData);
    return await this.skillRepository.save(skill);
  }

  // 🔹 Récupérer toutes les compétences
  async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }

  // 🔹 Récupérer une compétence par ID
  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  // 🔹 Mettre à jour une compétence
  async update(id: number, updateData: UpdateSkillDto ): Promise<Skill> {
    const skill = await this.skillRepository.preload({
      id,
      ...updateData,
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return await this.skillRepository.save(skill);
  }

  // 🔹 Supprimer une compétence
  async remove(id: number): Promise<void> {
    const result = await this.skillRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
  }
}
