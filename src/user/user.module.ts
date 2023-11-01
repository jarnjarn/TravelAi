import { Global, Module,OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { OnGatewayInit } from '@nestjs/websockets';
import { StringUtil } from 'src/common/utils/string.util';
import { UserRole } from './enums/userRole.enum';

@Global()
@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule implements OnModuleInit
{
	constructor(private readonly userService: UserService) {}
	async onModuleInit() {
		if(await this.userService.count()===0)
		{
			const user = new User();
			user.phone = "033615016";
			user.username = "admin";
			user.password = StringUtil.hashPassword("123456");
			user.role = UserRole.ROOT;
			await this.userService.create(user);
		}
	}
}
