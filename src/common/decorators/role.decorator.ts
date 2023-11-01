import { SetMetadata } from '@nestjs/common';

import { Prefix } from '../config/prefix.config';
export function Roles(...roles: string[]) {
	return function (target: any, key: string, descriptor?: any) {
		Reflect.defineMetadata(Prefix.ROLE, roles, target, key);
		target[Prefix.ROLE + key] = roles;
		SetMetadata(Prefix.ROLE, roles)(target, key, descriptor);
	};
}
