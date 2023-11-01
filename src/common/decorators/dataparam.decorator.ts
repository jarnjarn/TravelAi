import { applyDecorators } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

export function DataParam(...key: string[]) {
	var arr = [];
	for (let i of key) {
		arr.push(
			ApiParam({
				type: String,
				name: i,
			}),
		);
	}
	console.log(...arr)
	return applyDecorators(...arr);
}
