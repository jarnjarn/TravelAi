import { ToObjectId } from '../transforms/objectid.transform';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ObjectIdDto {
	@ApiProperty({ example: '5f9d4e9d3f0f0b1f1c6d7e1a',type: String })
	@ToObjectId()
	public id: Types.ObjectId;
}