import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from '../common/bases/service.base';
import { ListApiException } from 'src/common/decorators/listApiException.decorator';
import { ListException } from 'src/common/errors/list.error';
import { StringUtil } from 'src/common/utils/string.util';
import { UserLoginDto } from './dto/user.dto';
import { UserRegisterDto } from './dto/register.dto';
import { UserRole } from './enums/userRole.enum';

@Injectable()
export class UserService extends ServiceBase<User>
{
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>)
	{
		super(userModel,User);
	}

	async register(userRegisterDto: UserRegisterDto) {
		// Kiểm tra xem số điện thoại đã được sử dụng trước đó hay chưa
		const existingUser = await this.userModel.findOne({ phone: userRegisterDto.phone });
		if (existingUser) {
		  throw new ConflictException('Số điện thoại đã sử dụng');
		}
		// Nếu số điện thoại chưa được sử dụng, bạn có thể tạo một người dùng mới và lưu vào cơ sở dữ liệu.
		const hashedPassword = await StringUtil.hashPassword(userRegisterDto.password)
		const user = new this.userModel({...userRegisterDto,password:hashedPassword,role:UserRole.USER});
		return await user.save();
	  }

	async login(userLoginDto:UserLoginDto)
	{
		const user = await this.findOne({phone:userLoginDto.phone}).orThrow(ListException.USER_NOT_FOUND);
		if(!StringUtil.comparePassword(userLoginDto.password,user.password))
		{
			throw ListException.USER_PASSWORD_NOT_MATCH;
		}
		return StringUtil.genToken({id:user._id,role:user.role});
	}
}
 