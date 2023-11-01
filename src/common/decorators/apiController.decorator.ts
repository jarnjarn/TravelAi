import { applyDecorators, ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import MongooseClassSerializerInterceptor from '../interceptors/serialization.interceptor';
import { RoleGuard } from '../guards/role.guard';
import { AutoGuard } from '../guards/auto.guard';

export function ApiController(path: string = '/', ...versions: string[]) {
	return applyDecorators(
		Controller({
			path: path,
			version: versions,
		}),
		ApiTags(path.toUpperCase()),
		UseInterceptors(MongooseClassSerializerInterceptor),
		UseGuards(AuthGuard,RoleGuard,AutoGuard),
	);
}
