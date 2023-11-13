import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TravelScheduleService } from './travel-schedule.service';
import { Note } from 'src/common/decorators/note.decorator';
import { ObjectIdDto } from 'src/common/dtos/objectId.dto';
import { TravelScheduleCreateDto, TravelScheduleUpdateDto } from './dto/travel-schedule.dto';
import { ApiController } from 'src/common/decorators/apiController.decorator';

@ApiController('travel-schedule')
export class TravelScheduleController {
  constructor(private readonly travelScheduleService: TravelScheduleService) { }

  @Post()
  @Note('tạo lịch trình')
  async create(@Body() dto : TravelScheduleCreateDto) {
    return await this.travelScheduleService.autoCreateTravel(dto)
  }

  @Get()
  @Note('lấy dánh sách travel')
  async get(){
    return await this.travelScheduleService.findAll();
  }

  @Put(':id')
  @Note('tạo lịch trình')
  async update(@Param()param: ObjectIdDto, @Body() dto : TravelScheduleUpdateDto) {
    return await this.travelScheduleService.updateTravel(param.id,dto)
  }


}
