import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelScheduleService } from './travel-schedule.service';
import { CreateTravelScheduleDto } from './dto/create-travel-schedule.dto';
import { UpdateTravelScheduleDto } from './dto/update-travel-schedule.dto';

@Controller('travel-schedule')
export class TravelScheduleController {
  constructor(private readonly travelScheduleService: TravelScheduleService) {}

  @Post()
  create(@Body() createTravelScheduleDto: CreateTravelScheduleDto) {
    return this.travelScheduleService.create(createTravelScheduleDto);
  }

  @Get()
  findAll() {
    return this.travelScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelScheduleDto: UpdateTravelScheduleDto) {
    return this.travelScheduleService.update(+id, updateTravelScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelScheduleService.remove(+id);
  }
}
