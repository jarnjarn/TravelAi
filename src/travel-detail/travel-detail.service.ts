import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelDetail } from './travel-detail.schema';
import axios from 'axios';
import { createTraVelDetail, weatherDto } from './dto/travel-detail.dto';
import { LocationService } from '../location/location.service';
import { ListException } from 'src/common/errors/list.error';
import { ServiceBase } from 'src/common/bases/service.base';

@Injectable()
export class TravelDetailService extends ServiceBase<TravelDetail>{
  axiosClient: any;
  constructor(@InjectModel(TravelDetail.name) private travelDetailModel: Model<TravelDetail>, private readonly locationService: LocationService) {
    super(travelDetailModel, TravelDetail)

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

  async getWeather(lat: String, lon: String,) {
    const response = await this.axiosClient.get('/', {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.WEATHER_KEY
      },
    });

    const { main: { temp, humidity }, weather: [{ description }] } = response;

    return { temperature: temp, description, humidity };
  }


  async createTravelLocation(dto: createTraVelDetail) {
    const location = await this.locationService.findById(dto.location).orThrow(ListException.LOCATION_NOT_FOUND)

    const { coordinates: { latitude, longitude } } = location

    const weather = await this.getWeather(latitude, longitude);

    const celsiusTemperature = weather.temperature - 273.15;

    const convertedWeather = {
      temperature: celsiusTemperature,
      description: weather.description,
      humidity: weather.humidity,
    };

    return await this.create({
      location: location,
      weaTher: convertedWeather
    });
  }

}

