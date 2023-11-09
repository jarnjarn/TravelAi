import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TravelDetailService } from './travel-detail.service';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { createTraVelDetail, weatherDto } from './dto/travel-detail.dto';

@ApiController('travel-detail')
export class TravelDetailController {
  constructor(private readonly travelDetailService: TravelDetailService) {}

  // @Post()
  // @Note('test')
  // async getWeather(@Body() dto : weatherDto){
  //   return await this.travelDetailService.getWeather(dto)
  // }


  @Post()
  @Note('test')
  async create(@Body() dto : createTraVelDetail){
    return await this.travelDetailService.createTravelLocation(dto)
  }

}
