import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Prefix } from '../config/prefix.config';
export const GetData = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const store = request?.[Prefix.STORE] ?? {};
	console.log(store);
	if (data) {
		return store[data];
	}
	return store;
});
