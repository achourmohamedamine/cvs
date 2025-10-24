import { Type } from 'class-transformer/types/decorators/type.decorator';
import { IsString, IsEmail, IsNotEmpty, MinLength, IsArray, ValidateNested } from 'class-validator';
import { CreateCvDto } from 'src/cv/dto/create-cv.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;



  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCvDto)
  cvs?: CreateCvDto[];
}
