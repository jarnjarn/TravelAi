import { TransformFnParams } from 'class-transformer';

export class ObjectUtil {
	static toJson(obj: TransformFnParams) {
		return JSON.parse(obj.value);
	}
}
