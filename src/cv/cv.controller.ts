import { Controller } from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { BaseController } from '../common/base.controller';

@Controller('cvs')
export class CvController extends BaseController<Cv> {
  constructor(private readonly cvService: CvService) {
    super(cvService);
  }

  // Vous pouvez ajouter ici des méthodes spécifiques au CvController
  // Par exemple:
  // @Get('user/:userId')
  // findByUser(@Param('userId') userId: number) {
  //   return this.cvService.findByUser(userId);
  // }
}
