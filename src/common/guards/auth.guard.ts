import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException, Logger,Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

import { PUBLIC_KEY } from '../decorators/public.decorator';
import { StringUtil } from '../utils/string.util';
import { Prefix } from '../config/prefix.config';
import { GlobalConfig } from '../config/global.config';
import { ApiExceptionFilter } from '../errors/api.exception.fillter';
import { UserService } from 'src/user/user.service';
import { ListException } from '../errors/list.error';
@Injectable() 
export class AuthGuard implements CanActivate {

	private readonly logger = new Logger(AuthGuard.name);
	constructor(
		private readonly reflector: Reflector, 
		private readonly userService:UserService
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);
		const request = context.switchToHttp().getRequest();
		const token = StringUtil.extractTokenFromHeader(request);
		if (isPublic) {
			return true;
		}
		if (!token) {
			throw new UnauthorizedException();
		}
		let jwt = null;
		try {
			jwt = StringUtil.verifyToken(token);
			const user = await this.userService.findById(jwt.id).orThrow(ListException.USER_NOT_FOUND);
			request[Prefix.USER] = user;
		} catch (e) {
			this.logger.error(e);
			throw new UnauthorizedException();
		}
		return true
	}
}
