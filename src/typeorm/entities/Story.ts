import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stories' })
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  desc: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  author: string;
}
