import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { BaseService } from '../common/base.service';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvService extends BaseService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {
    super(cvRepository);
  }
  async create(createCvData: CreateCvDto): Promise<Cv> {
  const { userId, skills, ...cvData } = createCvData;
  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  const cv = this.cvRepository.create({ ...cvData, user });

 if (skills && skills.length > 0) {
  const skillEntities = await this.skillRepository.find({
    where: { id: In(skills) },
  });
  cv.skills = skillEntities;
}

  return await this.cvRepository.save(cv);
}
}
