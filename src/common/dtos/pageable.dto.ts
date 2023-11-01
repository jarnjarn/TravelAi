import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Sort } from '../types/utils.type';
import { Transform } from 'class-transformer';
import { ToNumber } from '../transforms/number.transform';

export class PaginationDto {
	@ToNumber()
	@IsInt()
	@Min(1)
	@Max(100)
	@IsOptional()
	@ApiProperty({ default: 10 })
	limit: number = 10;

	@ToNumber()
	@IsInt()
	@Min(1)
	@IsOptional()
	@ApiProperty({ default: 1 })
	page: number = 1;

	@IsOptional()
	@IsString()
	@ApiProperty({ default: '' })
	query?: string = '';

	get skip(): number {
		return (this.page - 1) * this.limit;
	}
}
