import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceBase } from 'src/common/bases/service.base';
import { TravelSchedule } from './travelSchedule.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import { LocationService } from '../location/location.service';
import { TravelScheduleCreateDto } from './dto/travel-schedule.dto';
@Injectable()
export class TravelScheduleService extends ServiceBase<TravelSchedule> {
    axiosClient: any;
    constructor(@InjectModel(TravelSchedule.name) private readonly travelScheduleModel: Model<TravelSchedule> , private readonly locationService: LocationService) {
        super(travelScheduleModel, TravelSchedule)

        this.axiosClient = axios.create({
            baseURL: process.env.WEATHER_LINK,
        });
        this.axiosClient.interceptors.response.use(
            (response) => {
                return response?.data;
            },
            (error) => {
                console.log(error);
                return Promise.reject(error.response.data);
            },
        );
    }



    async autoCreateTravel(dto: TravelScheduleCreateDto){

        

    }

}
