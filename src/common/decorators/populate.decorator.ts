import { SystemEnum } from "../enums/system.enum";
import { ArrayKeyOf } from "../types/utils.type";
export function Populate<T>(...fields: ArrayKeyOf<T>): ClassDecorator {
	return function (target: any) {
		target[Symbol.for(SystemEnum.POPULATE)] = [...fields];
	};
}
