/*
https://docs.nestjs.com/controllers#controllers
*/
import { Controller, Res, Get, Req, Post, Body, UseGuards, Query, Param, Put } from '@nestjs/common';
import { CustomRequest, CustomResponse } from 'src/type/http.type';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/entity/survey.entity';
import { Repository } from 'typeorm';
import { SurveyListDto, SurveyListGetOneDto, SurveyWriteDto } from './survey.dto';
import { SurveyService } from './survey.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthSkip } from 'src/decorator/auth-skip.decorator';

@Controller('survey')
// authGuard 동작 (해당 컨트롤러 로그인 안하면 접근불가)
@UseGuards(AuthGuard)
export class SurveyController {
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepo: Repository<SurveyEntity>,
    private surveyService: SurveyService
  ) { }

  @Get('list')
  // authSkip -> 로그인 안해도 접근 가능
  @AuthSkip()
  async getListAll(
    @Query() surveyListDto: SurveyListDto,
    @Req() req: CustomRequest,
    @Res() res: CustomResponse,
  ) {
    try {
      const surveyListAll = await this.surveyService.getListAll(surveyListDto);
      return res.json(surveyListAll);

    } catch (error) {
      throw error;
    }
  }

  @Get('list-one/:id')
  @AuthSkip()
  async getListOne(
    @Param() params: SurveyListGetOneDto,
    @Req() req: CustomRequest,
    @Res() res: CustomResponse,
  ) {
    try {
      const surveyListGetOne = await this.surveyService.getListOne(params);
      return res.json(surveyListGetOne)
    } catch (error) {
      throw error;
    }
  }

  @Post('write')
  async createSurvey(
    @Body() surveyWriteDto: SurveyWriteDto,
    @Res() res: CustomResponse,
    @Req() req: CustomRequest
  ) {

    const userId = req.userInfo.id
    const surveyInfo = await this.surveyService.createSurvey(surveyWriteDto, userId);
    return res.json(surveyInfo)
  }

  @Put('edit/:id')
  async editSurvey(
    @Param() surveyWriteDto: SurveyWriteDto,
    @Req() req: CustomRequest,
    @Res() res: CustomResponse
  ) {
    try {
      const userId = req.userInfo.id
      const surveyEdit = await this.surveyService.editSurvey(surveyWriteDto, userId)
    } catch (error) {
      throw error;
    }
  }
}
