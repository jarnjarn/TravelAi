import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TravelDetailService } from './travel-detail.service';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { ObjectIdDto } from 'src/common/dtos/objectId.dto';

@ApiController('travel-detail')
export class TravelDetailController {
  constructor(private readonly travelDetailService: TravelDetailService) {}

  @Post('travel/:id')
  @Note('test')
  async test(@Param() param: ObjectIdDto){
    return await this.travelDetailService.TravelDetail(param.id)
  }
}
