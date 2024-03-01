import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  email: string;

  @Column()
  role: string;

  // @Column({ nullable: true })
  // authStrategy: string;
}
