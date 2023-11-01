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
export class RoleGuard implements CanActivate {

	private readonly logger = new Logger(RoleGuard.name);
	constructor(
		private readonly reflector: Reflector, 
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);
		if (isPublic) {
			return true;
		}
		const { role } = request[Prefix.USER];
		if (!role) {
			throw new UnauthorizedException();
		}
		const roles = this.reflector.getAllAndOverride<string[]>(Prefix.ROLE, [context.getHandler(), context.getClass()]);
		if (roles) {
			if (!roles.includes(role)) {
				throw new ForbiddenException();
			}
		}
		return true;
	}
}
