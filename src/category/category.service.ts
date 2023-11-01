import { Injectable } from '@nestjs/common';
import { SchemaBase } from 'src/common/bases/schema.base';
import { ServiceBase } from 'src/common/bases/service.base';
import { Category } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService extends ServiceBase<Category> {
    constructor(@InjectModel(Category.name) private readonly userModel: Model<Category>)
	{
		super(userModel,Category);
	}
}
