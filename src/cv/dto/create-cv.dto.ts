import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { CreateSkillDto } from 'src/skill/dto/create-skill.dto';

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsString()
  @IsNotEmpty()
  Cin: string;



   @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsOptional()
  path?: string;

  @IsNumber()
  userId: number; 

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  skills?: CreateSkillDto[];
}
