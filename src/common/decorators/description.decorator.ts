export function Description(description: string) {
	return function (target: any, propertyKey: string) {
		target[Symbol.for(propertyKey)] = description;
	};
}