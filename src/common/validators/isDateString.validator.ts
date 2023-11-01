import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isDateString', async: false })
export class IsDateStringConstraint implements ValidatorConstraintInterface {
	validate(value: string, validationArguments?: ValidationArguments) {
		const [format] = validationArguments.constraints;

		// Kiểm tra định dạng dateString theo format được truyền vào
		const dateRegex = this.getRegexByFormat(format);
		return dateRegex.test(value);
	}
	private getRegexByFormat(format: string): RegExp {
		// Use a switch statement to handle different formats and their corresponding regex patterns
		switch (format.toLocaleLowerCase()) {
			case 'dd/mm/yyyy':
				return new RegExp('^\\d{2}\\/\\d{2}\\/\\d{4}$');
			case 'yyyy-mm-dd':
				return new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
			default:
				throw new Error('Invalid date format');
		}
	}
}

export function IsDateStringCustom(format: string, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [format],
			validator: IsDateStringConstraint,
		});
	};
}
