import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { SchemaBase } from '../common/bases/schema.base';
import { coordinates } from './@types/location.type';
import { Types } from 'mongoose';
import { Province } from 'src/province/province.schema';
import { Category } from 'src/category/category.schema';
import { Populate } from 'src/common/decorators/populate.decorator';
import { Specialty } from 'src/specialty/specilty.schema';

@Schema({
	timestamps: true,
	toJSON: {
		transform(doc, ret, options) {
			return ret;
		},
	},
})
@Populate<Location>('specialty')
export class Location extends SchemaBase {
	@Prop({ required: true })
	@ApiProperty({ example: 'long thành' })
	@Length(4, 50)
	name: string;

	@Prop({ required: true })
	@ApiProperty({ example: 'long thành' })
	@Length(4, 200)
	address: string;

	@Prop({ required: true, type: String })
	@ApiProperty({ type: String, format: 'binary' })
	@Length(1, 200)
	img: string;

	@Prop({ required: true, type: Object })
	@ApiProperty({ example: { latitude: '1', longitude: 1 } })
	coordinates: coordinates;

	@Prop({ required: true, type: Types.ObjectId, ref: Province.name })
	province: Province;

	@Prop({ required: true, type: Types.ObjectId, ref: Category.name })
	category: Category;

	specialty: Specialty[];
}
const LocationSchema = SchemaFactory.createForClass(Location);
LocationSchema.virtual('specialty', {
	ref: 'Specialty',
	localField: '_id',
	foreignField: 'location',
	justOne: false,
});

export { LocationSchema };
