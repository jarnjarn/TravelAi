import { Module } from '@nestjs/common';
import { TravelScheduleService } from './travel-schedule.service';
import { TravelScheduleController } from './travel-schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelSchedule, TravelScheduleSchema } from './travelSchedule.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: TravelSchedule.name, schema:TravelScheduleSchema }])],
  controllers: [TravelScheduleController],
  providers: [TravelScheduleService]
})
export class TravelScheduleModule {}
