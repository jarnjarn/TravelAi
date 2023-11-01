import { PartialType } from '@nestjs/swagger';
import { CreateTravelScheduleDto } from './create-travel-schedule.dto';

export class UpdateTravelScheduleDto extends PartialType(CreateTravelScheduleDto) {}
