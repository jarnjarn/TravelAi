import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
	private readonly code: string;

	public getCode(): string {
		return this.code;
	}
	constructor(statusCode: number, code: string,message: string) {
		super(message, statusCode);
		this.code = code;
	}

	public throw() {
		throw this;
	}

	public static CreateException(statusCode: number, code: string,message: string) {
		return new ApiException( statusCode, code,message);
	}

	public toJson() 
	{
		return {
			code: this.code,
			message: this.message,
			status: this.getStatus(),
			isError: true,
		}
	}
}
