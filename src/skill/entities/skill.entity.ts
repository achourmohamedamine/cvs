import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Cv } from 'src/cv/entities/cv.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  // Relation ManyToMany avec Cv
  @ManyToMany(() => Cv, (cv) => cv.skills)
  cvs: Cv[];
}
