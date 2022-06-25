import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum SurveyBoardTimeEnum {
  A = '1-3분',
  B = '4-6분',
  C = '7-10분',
  D = '10분 이상'
}
@Entity('surveyboard')
export class SurveyBoardEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({
    type: 'varchar',
    length: 50
  })
  title?: string

  @Column({
    type: 'datetime',
  })
  endDate?: any

  @Column({
    type: 'enum',
    enum: [
      SurveyBoardTimeEnum.A,
      SurveyBoardTimeEnum.B,
      SurveyBoardTimeEnum.C,
      SurveyBoardTimeEnum.D,
    ]
  })
  time?: SurveyBoardTimeEnum

  @Column({
    type: 'varchar',
    length: 20
  })
  target?: string

  @Column({
    type: 'text'
  })
  link?: string

  @Column({
    type: 'text'
  })
  description?: string

  @CreateDateColumn()
  createdAt?: any

  @UpdateDateColumn()
  updatedAt?: any
}