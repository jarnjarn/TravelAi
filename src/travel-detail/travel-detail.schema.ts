
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { SchemaBase } from '../common/bases/schema.base';
import {  Types } from 'mongoose';
import { weaTher } from './@types/travel-detail.type';
import { Location } from 'src/location/location.schema';


@Schema({
	timestamps: true,
	toJSON: {
		transform(doc, ret, options) {
			return ret;
		},
	},
})
export class TravelDetail extends SchemaBase {

    @Prop({required:true, type:Types.ObjectId,ref: Location.name, autopopulate: true })
	location : Location
	
    @Prop({ required: true, type: Object })
    @ApiProperty({ example: { temperature: 30, humidity: 65, description:'nhiều mây và sắp có mưa'} })
	weaTher: weaTher;

} 
export const TravelDetailSchema = SchemaFactory.createForClass(TravelDetail);
