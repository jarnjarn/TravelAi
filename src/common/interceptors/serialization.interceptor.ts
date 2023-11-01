import { ClassSerializerInterceptor, PlainLiteralObject, Type } from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Document } from 'mongoose';
import { IPage } from '../interfaces/page.interface';
import { Page } from '../obj/page.obj';

function MongooseClassSerializerInterceptor(classToIntercept: Type): typeof ClassSerializerInterceptor {
	return class Interceptor extends ClassSerializerInterceptor {
		private changePlainObjectToClass(document: PlainLiteralObject) {
			if (!(document instanceof Document)) {
				return document;
			}
			return plainToClass(classToIntercept, document.toJSON());
		}

		private prepareResponse(response: PlainLiteralObject | PlainLiteralObject[] | IPage<any>) {
			if (!Array.isArray(response) && response?.meta && response?.data) {
				const items = this.prepareResponse(response.data);
				return new Page(items, response.meta);
			}
			if (Array.isArray(response)) {
				return response.map(this.changePlainObjectToClass);
			}
			return this.changePlainObjectToClass(response);
		}

		serialize(response: PlainLiteralObject | PlainLiteralObject[] | IPage<any>, options: ClassTransformOptions) {
			return super.serialize(this.prepareResponse(response), options);
		}
	};
}

export default MongooseClassSerializerInterceptor;
