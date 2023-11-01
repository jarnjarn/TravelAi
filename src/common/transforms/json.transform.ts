import { Transform, TransformFnParams } from 'class-transformer';

export function ToJson(): PropertyDecorator {
	const REGEX_JSON_STRINGIFY = /^\s*\{.*\}\s*$/;
	function isJSON(str) {
		try {
			JSON.parse(str);
			return true;
		} catch (error) {
			return false;
		}
	}
	return Transform((obj: TransformFnParams) => {
		const { value } = obj;
		if (typeof value === 'string' && REGEX_JSON_STRINGIFY.test(value) && isJSON(value)) {
			return JSON.parse(value);
		}
		return value;
	});
}
