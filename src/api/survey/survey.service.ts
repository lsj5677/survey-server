import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SurveyEntity } from "src/entity/survey.entity";
import { Repository } from "typeorm";

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepo: Repository<SurveyEntity>,
  ) { }

  async createSurvey(params, userId): Promise<any> {
    try {

      const newSurvey = this.surveyRepo.create();
      newSurvey.userId = userId;
      newSurvey.title = params.title;
      newSurvey.time = params.time;
      newSurvey.target = params.target;
      newSurvey.endDate = params.endDate;
      newSurvey.link = params.link;
      newSurvey.description = params.description;

      const saveRes = await this.surveyRepo.save(newSurvey);

      return saveRes;


    } catch (error) {
      throw error;
    }
  }
}