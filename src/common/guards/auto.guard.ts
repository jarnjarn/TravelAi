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
import { User } from 'src/user/user.schema';
@Injectable() 
export class AutoGuard implements CanActivate {

	private readonly logger = new Logger(AutoGuard.name);
	constructor(
		private readonly userService:UserService
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const params = request.params || {};
		const store = {};
		await Array.from(Object.keys(params)).forAsync(async key => {
			if(StringUtil.isObjectId(params[key]))
			{
				store[key] = await this.registerCallBack(key,params[key]);
			}
		});
		request[Prefix.STORE] = store;
		return true
	}

	async registerCallBack(key,value)
	{
		switch (key) {
			case User.id:
				return await this.userService.findById(value).orThrow(ListException.USER_NOT_FOUND);
		}
	} 
}
