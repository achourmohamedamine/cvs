
import { Controller, Post, Body, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { BaseController } from '../common/base.controller';
import { CreateCvDto } from './dto/create-cv.dto';

@Controller('cvs')
export class CvController extends BaseController<Cv> {
  constructor(private readonly cvService: CvService) {
    super(cvService); 
  }
  @Post()
  async create(@Body() createCvDto: CreateCvDto): Promise<Cv> {
    return this.cvService.create(createCvDto); 
  }
}
