import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ClsModule, ClsService } from 'nestjs-cls';
import { UserModule } from './user/user.module';
import { TwilioModule } from 'nestjs-twilio';
import { LocationModule } from './location/location.module';
import { ProvinceModule } from './province/province.module';
import { CategoryModule } from './category/category.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { TravelScheduleModule } from './travel-schedule/travel-schedule.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		EventEmitterModule.forRoot({
			global: true,
		}),
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
				generateId: true,
				setup: (cls: ClsService, req: Request) => {},
			},
		}),
		MongooseModule.forRoot(process.env.MONGODB_URL, {
			connectionFactory: (connection) => {
				connection.plugin(require('mongoose-autopopulate'));
				return connection;
			},
		}),
		TwilioModule.forRoot({
			accountSid: process.env.TWILIO_ACCOUNT_SID,
			authToken: process.env.TWILIO_AUTH_TOKEN,
		}),

		UserModule,

		LocationModule,

		ProvinceModule,

		CategoryModule,

		SpecialtyModule,

		TravelScheduleModule,
	],
})
export class AppModule {}

