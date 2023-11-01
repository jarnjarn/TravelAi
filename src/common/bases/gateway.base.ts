import { Socket,Server } from 'socket.io';
import {SocketConnect} from '../types/gateway.type';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { StringUtil } from '../utils/string.util';
import { Logger } from '@nestjs/common';
import {TypeUtil} from '../utils/type.util';
import { GlobalConfig } from '../config/global.config';

export class GatewayBase<T> implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect
{
	public _server:Server
	public readonly _connects: Map<string, SocketConnect<T>> = new Map();
	private readonly _isVerify: boolean;
	private readonly _key: string;
	private readonly _logger: Logger;
	constructor(model:any) 
	{
		this._isVerify = model!=null;
		if(model)
		{
			this._key = TypeUtil.covert<string>(model.id).replace(':','')
		}
		this._logger = new Logger(this.constructor.name);
	}
	public async findSocket(callback: (data: T) => boolean): Promise<SocketConnect<T>[]> 
	{
		const result: SocketConnect<T>[] = [];
		this._connects.forEach(async(value: SocketConnect<T>) => {
			if (await callback(value.data)) {
				result.push(value);
			}
		});
		return result;
	}
	afterInit(server: Server) 
	{
		this._server = server;
	}
	async handleConnection(client: Socket) 
	{
		if(this._isVerify)
		{
			var jwt = StringUtil.extractTokenFromWebSocket(client);
			try 
			{ 
				jwt = StringUtil.verifyToken(jwt);
				const func = GlobalConfig.gI().getCallBack(this._key);
				const result = await func(jwt.id);
				this._connects.set(client.id,{socket:client,data:result})
			} 
			catch (e) 
			{	
				client.disconnect();
			}
		}
		else
		{
			this._connects.set(client.id, { socket: client });
		}
	}
	async handleDisconnect(client: Socket) 
	{
		this._connects.delete(client.id);
	}
}