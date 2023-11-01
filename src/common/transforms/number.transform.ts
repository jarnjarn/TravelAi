import { Transform, TransformFnParams } from 'class-transformer';

export function ToNumber(): PropertyDecorator {
	return Transform((obj: TransformFnParams) => {
		const { value } = obj;
		return parseInt(value, 10);
	});
}
