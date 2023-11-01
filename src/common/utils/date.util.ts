import { TransformFnParams } from 'class-transformer';
import { Unit } from '../enums/unit.enum';

export class DateUtil {
	static toDate(params: TransformFnParams) {
		// check is value match format dd/mm/yyyy
		const value = params.value;
		if (value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
			let dateParts = value.split('/');
			return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
		}
		return new Date(value);
	}
	// 1phuts = 60s
	// 1 là number
	// cover thành s
	static convertToSecond(number: number, unit: Unit) {
		switch (unit) {
			case 's':
				return number;
			case 'm':
				return number * 60;
			case 'h':
				return number * 60 * 60;
			case 'd':
				return number * 60 * 60 * 24;
			case 'w':
				return number * 60 * 60 * 24 * 7;
			case 'y':
				return number * 60 * 60 * 24 * 365;
			default:
				return number;
		}
	}
	//cover second to  1:00:00
	static convertSecondToMinuteAndSecond(second: number) {
		const padZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);
		return `${padZero(Math.floor(second / 3600))}:${padZero(Math.floor((second % 3600) / 60))}:${padZero(second % 60)}`;
	}

	static startDay(date: Date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	static endDay(date: Date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
	}

	static async delay(number: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, number);
		});
	}
}
