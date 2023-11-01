import { ApiException } from "../errors/apiException.error"
import { FileUtil } from "../utils/file.util";

export function ListApiException():ClassDecorator
{
	return function (target: any) {
		const json = [];
		for(let p of Object.keys(target))
		{
			const value = target[p];
			target[p] = ApiException.CreateException(value.status,p,value.message)
			json.push(target[p].toJson());
		}
		FileUtil.writeJsonFile("apiException.json",json);
	};
}