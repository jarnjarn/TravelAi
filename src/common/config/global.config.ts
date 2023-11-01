import { ApiException } from "../errors/apiException.error";

export class GlobalConfig
{
	private static _instance: GlobalConfig;
	private _map: Map<string, Function> = new Map();
	private constructor() { }
	public static gI(): GlobalConfig
	{
		if(!this._instance)
		{
			this._instance = new GlobalConfig();
		}
		return this._instance;
	}

	public resigterCallBack (key: string, callback:Function)
	{
		this._map.set(key,callback);
	}

	public getCallBack(key:string):Function
	{
		const result = this._map.get(key)
		if(!result)
		{
			return () => null;
		}
		return result;
	}
}
