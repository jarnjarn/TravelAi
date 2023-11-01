import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { Swagger } from './swagger.config';
import { Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ApiExceptionFilter } from '../errors/api.exception.fillter';
export class AppStart {
	private static app: INestApplication;
	public static setApp(app: INestApplication) {
		this.app = app;
		this.Start();
	}

	public static getApp() {
		return this.app;
	}

	private static enableCors() {
		AppStart.app.enableCors({
			methods: 'GET,PUT,POST,DELETE',
			origin: '*',
		});
		return this;
	}

	private static enableSwagger() {
		if (process.env.NODE_ENV !== 'production') {
			Swagger.setup(AppStart.app);
		}
		return this;
	}

	private static enableValidation() {
		AppStart.app.useGlobalPipes(
			new ValidationPipe({
				enableDebugMessages: true,
				skipNullProperties: true,
				stopAtFirstError: true,
				transform: true,
				validationError: {
					value: true,
					target: true,
				},
				//validateCustomDecorators: true,
			}),
		);
	}

	private static enableExceptionFillter() {
		AppStart.app.useGlobalFilters(new ApiExceptionFilter());
	}

	private static enableInterceptors() {
		//AppStart.app.useGlobalInterceptors(new TransformInterceptor());
	}

	private static publicStaticFolder() {
		if (process.env.STATIC_FOLDER) {
			// AppStart.app.useStaticAssets(join(process.cwd(), process.env.STATIC_FOLDER), {
			// 	prefix: '/public/',
			// });
		}
	}

	public static enableInterceptor() {
		// AppStart.app.useGlobalInterceptors(
		// 	new ClassSerializerInterceptor(AppStart.app.get(Reflector)),
		// );
		return this;
	}

	public static Start() {
		this.enableCors();
		this.enableSwagger();
		this.enableValidation();
		this.enableExceptionFillter();
		this.enableInterceptors();
		this.publicStaticFolder();
	}
}
