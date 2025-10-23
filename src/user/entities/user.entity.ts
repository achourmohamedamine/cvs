import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cv } from 'src/cv/entities/cv.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

 
  @OneToMany(() => Cv, (cv) => cv.user, { cascade: true })
  cvs: Cv[];
}
