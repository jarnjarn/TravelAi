export class NumberUtil {
	static toInt(value: any): number {
		return parseInt(value);
	}

	static toFloat(value: number): number {
		return parseFloat(value.toFixed(3));
	}

	// tạo hàm ramdom ngẫu nhiên số nếu value = 4 thì sẽ ramdom từ 0 đến 9999
	static randomNumber(value: number): number {
		return Math.floor(Math.random() * Math.pow(10, value));
	}

	// tạo hàm ramdom ngẫu nhiên số nếu value = 4 thì sẽ ramdom từ 100 đến 9999
	static randomNumberArray(value: number, length: number): number[] {
		const arr = [];
		for (let i = 0; i < length; i++) {
			arr.push(this.randomNumber(value));
		}
		return arr;
	}
}
