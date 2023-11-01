import { Prefix } from '../config/prefix.config';
import {
	applyDecorators,
	ClassSerializerInterceptor,
	Controller,
	ForbiddenException,
	HttpException,
	UnauthorizedException,
	UseInterceptors,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiExtraModels } from '@nestjs/swagger';
import 'reflect-metadata';
import { ReturnType } from '../types/utils.type';
export function Note(title: string, entity: any = null) {
	return function (target: any, prototypeKey: string, descriptor?: any) {
		var arr = [];
		const isPublic = target[Prefix.ACCESS + prototypeKey];
		if (!isPublic) {
			//title = "Public Api : " + title;
			arr.push(ApiBearerAuth());
		}
		var role = target[Prefix.ROLE + prototypeKey];
		if (role) {
			let roles = role as Array<string>;
			title += '  => ' + roles.join(',');
		}
		arr.push(
			ApiOperation({
				summary: title,
			}),
		);
		if (entity) {
			arr.push(
				ApiResponse({
					status: 200,
					description: 'OK',
					type: entity,
				}),
			);
			//arr.push(ApiExtraModels(generic));
		}
		return applyDecorators(...arr)(target, prototypeKey, descriptor);
	};
}
