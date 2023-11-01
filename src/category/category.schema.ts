
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { SchemaBase } from '../common/bases/schema.base';
import { Populate } from 'src/common/decorators/populate.decorator';


@Schema({
	timestamps: true,
	toJSON: {
		transform(doc, ret, options) {
			return ret;
		},
	},
})
export class Category extends SchemaBase {

	@Prop({ required: true })
	@ApiProperty({ example: 'Du lich bien' })
	@Length(1, 30)
	name: string;

    @Prop({ required: true })
	@ApiProperty({ example: 'moota' })
	@Length(1, 30)
	describe: string;

} 
export const CategorySchema = SchemaFactory.createForClass(Category);
