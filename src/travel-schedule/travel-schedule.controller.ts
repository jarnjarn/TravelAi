import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TravelScheduleService } from './travel-schedule.service';
import { Note } from 'src/common/decorators/note.decorator';
import { ObjectIdDto } from 'src/common/dtos/objectId.dto';
import { StatusUpdateDto, TimeUpdateDto, TravelScheduleCreateDto, TravelScheduleUpdateDto } from './dto/travel-schedule.dto';
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

  @Put('add/:id')
  @Note('Thêm địa điểm mới vào lịch trình')
  async updateAddTravel(@Param()param: ObjectIdDto, @Body() dto : TravelScheduleUpdateDto) {
    return await this.travelScheduleService.updateAddTravel(param.id,dto)
  }
  @Put('remove/:id')
  @Note('Xóa 1 địa điểm trong lịch trình lịch trình')
  async updateRemoveTravvel(@Param()param: ObjectIdDto, @Body() dto : TravelScheduleUpdateDto) {
    return await this.travelScheduleService.updateRemoveTravel(param.id,dto)
  }
  @Put('time/:id')
  @Note('thay đổi thời gian lịch trình')
  async updateTimeTravvel(@Param()param: ObjectIdDto, @Body() dto : TimeUpdateDto) {
    return await this.travelScheduleService.updatetimeTravel(param.id,dto)
  }
  @Put('status/:id')
  @Note('thay đổi trạng thái lịch trình')
  async updateStatusTravvel(@Param()param: ObjectIdDto, @Query() dto : StatusUpdateDto) {
    return await this.travelScheduleService.updateStatusTravel(param.id,dto)
  }

}
