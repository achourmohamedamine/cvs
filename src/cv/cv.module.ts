import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { Cv } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { SkillModule } from 'src/skill/skill.module';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Cv,User,Skill])],
  
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
