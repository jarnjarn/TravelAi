import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelScheduleService } from './travel-schedule.service';

@Controller('travel-schedule')
export class TravelScheduleController {
  constructor(private readonly travelScheduleService: TravelScheduleService) {}

}
