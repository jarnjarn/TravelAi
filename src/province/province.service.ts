import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Province } from './province.schema';
import { ServiceBase } from 'src/common/bases/service.base';
import { Model } from 'mongoose';

@Injectable()
export class ProvinceService extends ServiceBase<Province>{
  constructor(@InjectModel(Province.name) private readonly userModel: Model<Province>)
	{
		super(userModel,Province);
	}
}
