import { Injectable } from '@nestjs/common';
import { Location } from './location.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceBase } from 'src/common/bases/service.base';
import { LocationDto, LocationPagination } from './dto/location.dto';
import axios from 'axios';

@Injectable()
export class LocationService extends ServiceBase<Location> {
	axiosClient: any;
	constructor(@InjectModel(Location.name) private readonly locationModel: Model<Location>) {
		super(locationModel, Location);

		this.axiosClient = axios.create({
			baseURL: process.env.MOONGMAP_LINK,
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

	async getById(id: string | Types.ObjectId) {
		try {
			const location = await this.locationModel
				.findById(id)
				.populate({
					path: 'province',
					select: 'id name describe',
				})
				.populate({
					path: 'category',
					select: 'id name describe',
				})
				.populate({
					path: 'specialty',
					select: 'name describe img price',
				})
				.exec();

			if (location) {
				return location;
			} else {
				return null;
			}
		} catch (error) {
			throw error;
		}
	}

	async getLocationsByCateAndPro(cate, pro): Promise<Location[]> {
		const Location = await this.locationModel.find({ category: cate, province: pro }).exec();
		return Location;
	}

	async getNearestLocations(dto: LocationDto) {
		const locations = await this.getLocationsByCateAndPro(dto.category, dto.province);
		const reuslt = [];
		const distances = [];
		for (const location of locations) {
			const coordinates = JSON.parse(location.coordinates as any);
			const response = await this.axiosClient.get('/DistanceMatrix', {
				params: {
					origins: dto.locationUser,
					destinations: `${coordinates.latitude},${coordinates.longitude}`,
					vehicle: 'car',
					api_key: process.env.GOONGMAP_KEY,
				},
			});
			reuslt.push({ location: location, response })
		}
		reuslt.forEach(item => {
			const distancce = item.response.rows[0].elements[0].distance.value
			const location = item.location

			distances.push({ location, distancce })
		});

		distances.sort((a, b) => {
			const distanceA = parseFloat(a.distance);
			const distanceB = parseFloat(b.distance);
			return distanceA - distanceB;
		});

		const nearestLocations = distances.slice(0, 5);
		return nearestLocations

	}
}

