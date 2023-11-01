import { Module } from '@nestjs/common';
import { TravelScheduleService } from './travel-schedule.service';
import { TravelScheduleController } from './travel-schedule.controller';

@Module({
  controllers: [TravelScheduleController],
  providers: [TravelScheduleService]
})
export class TravelScheduleModule {}
