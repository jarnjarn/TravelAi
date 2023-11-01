import { ApiException } from './apiException.error';
import {ExceptionFilter, Catch, ArgumentsHost, HttpException, ExecutionContext} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
	catch(exception: ApiException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		response.status(status).json({
			path: request.url,
			...exception.toJson(),
		});
	}

	static catch(exception: ApiException,context: ExecutionContext) {
		const response = context.switchToHttp().getResponse<Response>();
		const request = context.switchToHttp().getRequest<Request>();
		const status = exception.getStatus();
		response.status(status).json({
			path: request.url,
			...exception.toJson(),
		});
	}
}
