import { PaginationDto } from '../dtos/pageable.dto';
import { IPage, IMeta } from '../interfaces/page.interface';

export class Page<T> implements IPage<T> {
	constructor(data?: T[], meta?: IMeta) {
		this.data = data;
		if (meta) {
			this.meta = meta;
		} else {
			this.meta = {};
		}
	}
	[key: string]: any;
	public data: T[];
	public meta: IMeta;
	toModel<K>(callback?: (item: T) => K): IPage<K> {
		const data = this.data.map(callback);
		return new Page<K>(data, this.meta);
	}

	setDto(dto: Partial<PaginationDto>): IPage<T> {
		this.meta.limit = dto.limit;
		this.meta.page = dto.page;
		return this;
	}

	setData(data: T[]): IPage<T> {
		this.data = data;
		return this;
	}

	setTotal(total: number): IPage<T> {
		this.meta.total = total;
		this.meta.totalPage = Math.ceil(total / this.meta.limit);
		return this;
	}

	add<V>(key: string, value: V): IPage<T> {
		this[key] = value;
		return this;
	}

	addMeta<V>(key: string, value: V): IPage<T> {
		this.meta[key] = value;
		return this;
	}

	static empty<T>(): IPage<T> {
		return new Page<T>([]);
	}
}
