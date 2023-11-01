import { ApiException } from '../errors/apiException.error';
import { StringUtil } from '../utils/string.util';
import { CallHandler, CanActivate, ExecutionContext, NestInterceptor, UseGuards, UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage, memoryStorage } from 'multer';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';
import { Observable } from 'rxjs';
import { FileMulter } from '../types/file.type';
import { Prefix } from '../config/prefix.config';
export enum UploadType {
	DISK,
	MEMORY,
}

export function Upload(fieldName: string, folder: string, requeired: boolean = true, customName?: (file: FileMulter) => string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		return applyDecorators(
			ApiConsumes('multipart/form-data'),
			UseInterceptors(
				FileInterceptor(fieldName, {
					storage: diskStorage({
						destination: path.join(Prefix.UPLOAD_PATH, folder),
						filename: (req, file, cb) => {
							if (customName) {
								let fileName = customName(file);
								req.body[fieldName] = path.join(folder, fileName);
								cb(null, fileName);
								return;
							}
							// get file extension from original file name
							const fileExtName = path.extname(file.originalname);
							let fileName = Date.now() + fileExtName;
							req.body[fieldName] = path.join(folder, fileName);
							cb(null, fileName);
						},
					}),
					fileFilter(req, file, callback) {
						if (!file && requeired) {
							callback(new ApiException(400, 'FILE_IS_REQUIRED',`${fieldName.toUpperCase()} is required`), false);
						} else if (file) {
							callback(null, true);
						}
					}, 
				}),
			),
		)(target, propertyKey, descriptor);
	};
}
