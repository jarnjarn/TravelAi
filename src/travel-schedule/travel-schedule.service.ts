import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceBase } from 'src/common/bases/service.base';
import { TravelSchedule } from './travelSchedule.schema';
import { Model, Types } from 'mongoose';
import axios from 'axios';
import { LocationService } from '../location/location.service';
import { TravelScheduleCreateDto, TravelScheduleUpdateDto } from './dto/travel-schedule.dto';
import { TravelDetailService } from '../travel-detail/travel-detail.service';
import { ListException } from 'src/common/errors/list.error';
import { ObjectIdDto } from 'src/common/dtos/objectId.dto';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { ProvinceService } from '../province/province.service';
import { travelStatus } from './enum/travel.enum';
@Injectable()
export class TravelScheduleService extends ServiceBase<TravelSchedule> {
	axiosClient: any;
	constructor(
		@InjectModel(TravelSchedule.name) private readonly travelScheduleModel: Model<TravelSchedule>,
		private readonly locationService: LocationService,
		private readonly travelDetailService: TravelDetailService,
		private readonly userService: UserService,
		private readonly categoryService: CategoryService,
		private readonly provinceService: ProvinceService

	) {
		super(travelScheduleModel, TravelSchedule);

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

	async autoCreateTravel(dto: TravelScheduleCreateDto) {
		const user = await this.userService.findById(dto.user).orThrow(ListException.USER_NOT_FOUND)
		const cate = await this.categoryService.findById(dto.category).orThrow(ListException.CATEGORY_NOT_FOUND)
		const provice = await this.provinceService.findById(dto.province).orThrow(ListException.PROVINCE_NOT_FOUND)
		const travelDetail = await this.travelDetailService.createTravelLocation(dto)
		const [latitude, longitude] = dto.locationUser.split(",");
		const userLocation = {
			latitude: latitude,
			longitude: longitude,
		};
		console.log(travelDetail)
		return await this.create({
			user: user,
			dayStart: dto.dayStart,
			dayEnd: dto.dayEnd,
			coordinates: userLocation,
			locationTravel: travelDetail,
			status: travelStatus.NOTSTART
		})

	}

	async deleteLocation(id: string | Types.ObjectId, dto: TravelScheduleUpdateDto) {
		const travel = await this.findById(id).orThrow(ListException.TRAVELSCHEDULE_NOT_FOUND);
		const filteredLocations = travel.locationTravel.filter(item => !item.location._id.equals(dto.location._id));
		if (filteredLocations.length !== travel.locationTravel.length) {
			travel.locationTravel = filteredLocations;
			return await travel.save();
		}
	}

	async addLocation(id: string | Types.ObjectId, dto: TravelScheduleUpdateDto) {
		const travel = await this.findById(id).orThrow(ListException.TRAVELSCHEDULE_NOT_FOUND);
		const locationExists = travel.locationTravel.some(item => item.location._id.equals(dto.location._id));
		if (locationExists) {
			throw new HttpException('Địa điểm này đã tồn tại', HttpStatus.BAD_REQUEST);
		}

		const location = await this.travelDetailService.TravelDetail(dto.location);

		travel.locationTravel.push(location); 
		console.log(travel)
		await travel.save(); 
		return travel; 
	}
	

	async updateTravel(id: string | Types.ObjectId, dto: TravelScheduleUpdateDto) {
		const travel = await this.findById(id).orThrow(ListException.TRAVELSCHEDULE_NOT_FOUND)
		const test = await this.addLocation(id, dto)
		return test
	}
}

