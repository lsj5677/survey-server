import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// @Entity(tablename)
@Entity('user')
export class UserEntity {
  // decorator : 기능을 확장시키는 역할
  @PrimaryGeneratedColumn()
  id?: number

  @Column({
    type: 'varchar',
    length: 50
  })
  email?: string

  @Column({
    type: 'varchar',
    length: 20
  })
  password?: string

  @Column({
    type: 'varchar',
    length: 30
  })
  name?: string

  @CreateDateColumn()
  createdAt?: any

  @UpdateDateColumn()
  updatedAt?: any
}