import { Injectable } from '@nestjs/common';
import { CreateTravelScheduleDto } from './dto/create-travel-schedule.dto';
import { UpdateTravelScheduleDto } from './dto/update-travel-schedule.dto';

@Injectable()
export class TravelScheduleService {
  create(createTravelScheduleDto: CreateTravelScheduleDto) {
    return 'This action adds a new travelSchedule';
  }

  findAll() {
    return `This action returns all travelSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travelSchedule`;
  }

  update(id: number, updateTravelScheduleDto: UpdateTravelScheduleDto) {
    return `This action updates a #${id} travelSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} travelSchedule`;
  }
}
