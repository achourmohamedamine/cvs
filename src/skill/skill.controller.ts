import { Controller } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { BaseController } from '../common/base.controller';

@Controller('skills')
export class SkillController extends BaseController<Skill> {
  constructor(private readonly skillService: SkillService) {
    super(skillService);
  }

  // Vous pouvez ajouter ici des méthodes spécifiques au SkillController
  // Par exemple:
  // @Get('category/:category')
  // findByCategory(@Param('category') category: string) {
  //   return this.skillService.findByCategory(category);
  // }
}
  remove(@Param('id') id: string) {
    return this.skillService.remove(+id);
  }
}
