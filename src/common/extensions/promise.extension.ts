import { ApiException } from '../errors/apiException.error';
export {};

declare global {
	interface Promise<T> {
		orThrow(error: ApiException): Promise<T>;
		ifPresentThrow(error: ApiException): Promise<T>;
		orElse(value: T): Promise<T>;
	}
}

Promise.prototype.orThrow = function (error: ApiException) {
	// if data is null or undefined throw error
	return this.then((data) => {
		if (data === null || data === undefined || !data) {
			error.throw();
		}
		return data;
	});
};

Promise.prototype.ifPresentThrow = function (error: ApiException) {
	// if data is null or undefined throw error
	return this.then((data) => {
		if (data) {
			error.throw();
		}
		return data;
	});
};

Promise.prototype.orElse = function (value) {
	// if data is null or undefined throw error
	return this.then((data) => {
		if (data === null || data === undefined || !data) {
			return value;
		}
		return data;
	});
};