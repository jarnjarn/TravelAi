import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TravelDetail } from './travel-detail.schema';
import axios from 'axios';
import { createTraVelDetail, weatherDto } from './dto/travel-detail.dto';
import { LocationService } from '../location/location.service';
import { ListException } from 'src/common/errors/list.error';
import { ServiceBase } from 'src/common/bases/service.base';
import { LocationDto } from 'src/location/dto/location.dto';
import { TravelScheduleCreateDto } from 'src/travel-schedule/dto/travel-schedule.dto';

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

  async createTravelLocation(dto: TravelScheduleCreateDto) {
    const locations = await this.locationService.getNearestLocations(dto);
    const promises = [];

    for (const item of locations) {
      const coordinates = JSON.parse(item.location.coordinates as any);
      console.log(coordinates.latitude, coordinates.longitude);
      const promise = this.getWeather(coordinates.latitude, coordinates.longitude)
        .then((weather) => {
          const celsiusTemperature = weather.temperature - 273.15;
          const convertedWeather = {
            temperature: celsiusTemperature,
            description: weather.description,
            humidity: weather.humidity,
          };
          return this.travelDetailModel.create({
            location: item.location,
            weaTher: convertedWeather,
          });
        });

      promises.push(promise);
    }

    const results = await Promise.all(promises);

    return results;
  }

  async TravelDetail(id: string | Types.ObjectId) {
    const promises = [];
    const location = await this.locationService.findById(id).orThrow(ListException.LOCATION_NOT_FOUND);
    const coordinates = JSON.parse(location.coordinates as any);
    console.log(coordinates.latitude, coordinates.longitude);
    const promise = this.getWeather(coordinates.latitude, coordinates.longitude)
      .then((weather) => {
        const celsiusTemperature = weather.temperature - 273.15;
        const convertedWeather = {
          temperature: celsiusTemperature,
          description: weather.description,
          humidity: weather.humidity,
        };
        return this.travelDetailModel.create({
          location: location,
          weaTher: convertedWeather,
        });
      });

    promises.push(promise);
    const results = await Promise.all(promises);

    return results;
  }

}

