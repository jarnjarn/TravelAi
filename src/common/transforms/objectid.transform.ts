import { Transform, TransformFnParams } from 'class-transformer';
import { StringUtil } from '../utils/string.util';
import { Types } from 'mongoose';

export function ToObjectId(): PropertyDecorator {
	return Transform((obj: TransformFnParams) => {
		const { value } = obj;

		if (value instanceof Types.ObjectId) {
			return value;
		}
		return StringUtil.toObjectId(value);
	});
}
