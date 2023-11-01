import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { Request } from 'express';
import { JwtToken } from '../obj/jwt.obj';
import { JwtEncode } from '../obj/jwtEncode.obj';
import { Socket } from 'socket.io';
import { Multer } from 'multer';

const jwt = require('jsonwebtoken');
export class StringUtil {
	public static getNowDate() {
		const date = new Date();
		return `${this.padleft(date.getDate().toString(), 2, '0')}-${this.padleft((date.getMonth() + 1).toString(), 2, '0')}-${this.padleft(
			date.getFullYear().toString(),
			2,
			'0',
		)}`;
	}
	public static getNowTime() {
		const date = new Date();
		return `${this.padleft(date.getHours().toString(), 2, '0')}:${this.padleft(date.getMinutes().toString(), 2, '0')}:${this.padleft(date.getSeconds().toString(), 2, '0')}`;
	}
	public static padleft(str: string, length: number, padString: string) {
		while (str.length < length) str = padString + str;
		return str;
	}
	private static readonly saltRounds = 10;

	public static hashPassword(password: string): string {
		return bcrypt.hashSync(password, StringUtil.saltRounds);
	}

	public static comparePassword(password: string, hash: string): boolean {
		return bcrypt.compareSync(password, hash);
	}

	public static genToken(payload: Object): JwtToken {
		return {
			token: jwt.sign(payload, process.env.JWT_SECRET_KEY, {
				expiresIn: process.env.JWT_EXPIRES_IN, 
			}),
			role: payload['role'],
		};
	}

	public static verifyToken(token: string): JwtEncode {
		return jwt.verify(token, process.env.JWT_SECRET_KEY);
	}

	public static genRandomStr(length: number): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	public static genRandomNumber(length: number): string {
		const randomNumber = Math.floor(Math.random() * 1000000);
		return randomNumber.toString().padStart(length, '0');
	}

	public static queryLike(query: string | String): Object {
		return { $regex: query.toString(), $options: 'i' };
	}
	public static genObjectId(): mongoose.Types.ObjectId {
		return new mongoose.Types.ObjectId();
	}
	public static toObjectId(id: any): mongoose.Types.ObjectId {
		return new mongoose.Types.ObjectId(id);
	}

	public static isObjectId(id: string): boolean {
		return mongoose.Types.ObjectId.isValid(id);
	}
	public static extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
	public static extractTokenFromWebSocket(client: Socket) {
		let data = client.handshake.auth.Authorization || client.handshake.headers.authorization;
		const [type, token] = data?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
	public static genCode(len: number): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < len; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	public static toVnd(value: number): string {
		return value.toLocaleString('vi-VN', {
			style: 'currency',
			currency: 'VND',
		});
	}

	public static covertToBase64(file: Multer.File): string {
		return Buffer.from(file.buffer).toString('base64');
	}

	public static getNumberFromString(str: string): number {
		return Number(str.match(/\d+/g).join(''));
	}

	public static genImageName(file: Multer.File): string {
		const extension = file.mimetype.split('/')[0];
		switch (extension) {
			case 'image':
				return `${StringUtil.genCode(20)}.jpg`;
			case 'video':
				return `${StringUtil.genCode(20)}.mp4`;
			case 'audio':
				return `${StringUtil.genCode(20)}.mp3`;
			default:
				// get extension from file name
				return `${StringUtil.genCode(20)}.${file.originalname.split('.').pop()}`;
		}
	}

	public static queryDate(from: Date, to: Date): object {
		from = new Date(Number(from));
		to = new Date(Number(to));
		from.setHours(0, 0, 0, 0);
		to.setHours(23, 59, 59, 999);
		return {
			$gte: from,
			$lte: to,
		};
	}

	public static toSnakeCase(str: string): string {
		return str.replace(/([A-Z])/g, '_$1').toLowerCase();
	}
}
