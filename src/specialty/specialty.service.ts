import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceBase } from 'src/common/bases/service.base';
import { Specialty } from './specilty.schema';

@Injectable()
export class SpecialtyService extends ServiceBase<Specialty> {
    constructor(@InjectModel(Specialty.name) private readonly specialtyModel: Model<Specialty>) {
		super(specialtyModel, Specialty);
	}
 
	async getById(id: string | Types.ObjectId) {
		try {
			const location = await this.specialtyModel
				.findById(id)
				.populate({
					path: 'location',
					select: 'id name describe',
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

	async getSpecialtyByidLocation(id: string | Types.ObjectId){
		return await this.specialtyModel.find({location: id})
	}
}
