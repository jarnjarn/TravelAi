import { Transform, TransformFnParams } from 'class-transformer';

export function ToDate(): PropertyDecorator {
	const REGEX_DD_MM_YYYY = /^(\d{2})\/(\d{2})\/(\d{4})$/;
	const REGEX_YYYY_MM_DD = /^(\d{4})-(\d{2})-(\d{2})$/;
	const REGEX_YYYY_MM_DD_HH_MM_SS = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
	const REGEX_STRING_NUMBER = /^\d+$/;
	return Transform((obj: TransformFnParams) => {
		const { value } = obj;
		if (isNaN(value) && typeof value === 'string') {
			if (REGEX_DD_MM_YYYY.test(value)) {
				const [day, month, year] = value.split('/');
				return new Date(`${year}-${month}-${day}`);
			}
			if (REGEX_YYYY_MM_DD.test(value)) {
				const [year, month, day] = value.split('-');
				return new Date(`${year}-${month}-${day}`);
			}
			if (REGEX_YYYY_MM_DD_HH_MM_SS.test(value)) {
				const [year, month, day, hour, minute, second] = value.split(/[- :]/);
				return new Date(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
			}
			if (REGEX_STRING_NUMBER.test(value)) {
				return new Date(parseInt(value, 10));
			}
		} else if (!isNaN(value) && typeof value === 'number') {
			return new Date(value);
		}
	});
}
