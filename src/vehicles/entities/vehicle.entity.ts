import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { randomUUID } from 'node:crypto';

@Entity('vehicles')
export class Vehicle {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  placa: string;

  @Column({ unique: true })
  chassi: string;

  @Column({ unique: true })
  renavam: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = randomUUID();
  }
}
