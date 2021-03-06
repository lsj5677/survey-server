import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SurveyEntity } from "src/entity/survey.entity";
import { PaginationUtil } from "src/util/pagination.util";
import { Repository } from "typeorm";

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepo: Repository<SurveyEntity>,
    private paginationUtil: PaginationUtil
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

  async editSurvey(SurveyListGetOneDto, userId): Promise<any> {
    try {
      // const before = await this.todo.findOne(id);
      // await this.todo.update(id, { isDone: !before.isDone });

      const params = await this.surveyRepo.findOneBy(SurveyListGetOneDto)
      console.debug(`SUJIN:: ~ editSurvey ~ params`, params)
      const updateRes = await this.surveyRepo.upsert(params, [userId])
      console.debug(`SUJIN:: ~ editSurvey ~ updateRes`, updateRes)
      return updateRes;

    } catch (error) {
      throw error;
    }
  }

  async getListAll(surveyListDto): Promise<any> {
    try {
      const { page = 1, limit = 10 } = surveyListDto
      // const surveyListAll = await this.surveyRepo.find();

      const qb = this.surveyRepo
        .createQueryBuilder('surveyBoard')
        .orderBy('surveyBoard.createdAt', 'DESC')

      const options = { page, limit }
      const paginateRes = await this.paginationUtil.proxyPagination(qb, options);

      return paginateRes;

    } catch (error) {
      throw error;
    }
  }

  async getListOne(SurveyListGetOneDto): Promise<any> {

    try {
      const surveyListGetOne = await this.surveyRepo.findOneBy(SurveyListGetOneDto)
      return surveyListGetOne;

    } catch (error) {
      throw error;
    }
  }
}