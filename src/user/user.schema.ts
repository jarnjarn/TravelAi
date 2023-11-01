
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import {UserRole} from './enums/userRole.enum';
import { SchemaBase } from '../common/bases/schema.base';
import { Populate } from 'src/common/decorators/populate.decorator';


@Schema({
	timestamps: true,
	toJSON: {
		transform(doc, ret, options) {
			delete ret.__v;
			delete ret.password;
			return ret;
		},
	},
})
@Populate<User>('role')
export class User extends SchemaBase {

	@Prop({ required: true })
	@ApiProperty({ example: '0392804147' })
	@Length(4, 20)
	phone: string;

	@Prop({ required: true })
	@ApiProperty({ example: 'NGUYỄN XUÂN GIẢNG' })
	username: string;

	@Prop({ required: true })
	@ApiProperty({ example: '123456' })
	password: string;

	@Prop({ required: true,default:UserRole.ROOT,type:String,enum:UserRole })
	@ApiProperty({ example: 'ROOT' })
	@IsEnum(UserRole)
	role: UserRole;
} 
export const UserSchema = SchemaFactory.createForClass(User);
