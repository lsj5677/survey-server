import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum SurveyBoardTimeEnum {
  A = '1-3분',
  B = '4-6분',
  C = '7-9분',
  D = '10분 이상'
}
@Entity('surveyboard')
export class SurveyEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({
    type: 'int'
  })
  userId?: number

  @Column({
    type: 'varchar',
    length: 50
  })
  title?: string

  @Column({
    name: 'endDate',
    type: 'varchar',
    length: 20
  })
  endDate?: string

  // get endDate() {
  //   return +this._endDate
  // }

  // set endDate(newEndDate) {
  //   this._endDate = `${newEndDate}`
  // }

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