
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { SchemaBase } from '../common/bases/schema.base';
import {  Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { TravelDetail } from 'src/travel-detail/travel-detail.schema';
import { travelStatus } from './enum/travel.enum';
import { coordinatesUser } from 'src/travel-detail/@types/locationUser.type';


@Schema({
	timestamps: true,
	toJSON: {
		transform(doc, ret, options) {
			return ret;
		},
	},
})
export class TravelSchedule extends SchemaBase {

    @Prop({required:true, type:Types.ObjectId,ref: User.name, autopopulate: true })
	user : User

    @Prop({ required: true })
	@ApiProperty({ example: '2021-05-31T07:59:12.000Z' })
	dayStart: Date;

    @Prop({ required: true })
	@ApiProperty({ example: '2021-05-31T07:59:12.000Z' })
	dayEnd: Date;

	@Prop({ required: true, type: Object })
	@ApiProperty({ example: { latitude: '1', longitude: '1' } })
	coordinates: coordinatesUser;

	@Prop({required: true, type: String, enum : travelStatus})
	status: travelStatus

	@Prop({required:true , type: Array})
	locationTravel : TravelDetail[]


} 
export const TravelScheduleSchema = SchemaFactory.createForClass(TravelSchedule);
