import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

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
  userId: number; // pour lier le CV à un User existant

  @IsOptional()
  skillsIds?: number[]; // IDs des skills liés
}
