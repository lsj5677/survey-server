/*
https://docs.nestjs.com/controllers#controllers
*/
import { Controller, Res, Get } from '@nestjs/common';
import { CustomResponse } from 'src/type/http.type';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyBoardEntity } from 'src/entity/survey-board.entity';
import { Repository } from 'typeorm';

@Controller('survey')
export class SurveyController {
  constructor(
    @InjectRepository(SurveyBoardEntity)
    private surveyRepo: Repository<SurveyBoardEntity>
  ) { }

  @Get('list')
  async getListAll(
    @Res() res: CustomResponse,
  ) {
    console.log(`SUJIN:: ~ res`, res)
    try {

      const surveyListAll = await this.surveyRepo.find();
      console.log(`SUJIN:: ~ surveyListAll`, surveyListAll)

      return res.json(surveyListAll);

    } catch (error) {
      throw error;
    }
  }
}
