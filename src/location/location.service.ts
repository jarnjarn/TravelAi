import { Injectable } from '@nestjs/common';
import { Location } from './location.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceBase } from 'src/common/bases/service.base';

@Injectable()
export class LocationService extends ServiceBase<Location> {
	constructor(@InjectModel(Location.name) private readonly locationModel: Model<Location>) {
		super(locationModel, Location);
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

}
