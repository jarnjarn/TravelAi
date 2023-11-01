
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { SchemaBase } from '../common/bases/schema.base';
import { Types } from 'mongoose';
import { Location } from 'src/location/location.schema';


@Schema({
	timestamps: true,
	toJSON: {
		transform(doc, ret, options) {
			return ret;
		},
	},
})
export class Specialty extends SchemaBase {

	@Prop({ required: true })
	@ApiProperty({ example: 'Du lich bien' })
	@Length(1, 30)
	name: string;

	@Prop({ required: true, type: String })
	@ApiProperty({ type: String, format: 'binary' })
	@Length(1, 200)
	img: string;

    @Prop({ required: true })
	@ApiProperty({ example: '150.000vnd/1kg' })
	@Length(1, 30)
	price: string;

    @Prop({ required: true })
	@ApiProperty({ example: 'moota' })
	@Length(1, 30)
	describe: string;

    @Prop({required:true, type:Types.ObjectId,ref: Location.name, autopopulate: true })
	location : Location

} 
export const SpecialtySchema = SchemaFactory.createForClass(Specialty);
