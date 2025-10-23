import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  Cin: string;

  @Column()
  job: string;

  @Column()
  path: string;
  

  // Relation ManyToOne avec User
  @ManyToOne(() => User, (user) => user.cvs, { eager: true, onDelete: 'CASCADE' })
  user: User;

  // Relation ManyToMany avec Skill
  @ManyToMany(() => Skill, (skill) => skill.cvs, {
    cascade: true,
  })
  @JoinTable({
    name: 'cv_skills', // table intermédiaire
    joinColumn: {
      name: 'cv_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill_id',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
}
