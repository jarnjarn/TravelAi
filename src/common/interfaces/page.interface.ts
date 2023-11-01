import { PaginationDto } from '../dtos/pageable.dto';
export interface IPage<T> {
	data: T[];
	meta: IMeta;
	toModel<K>(callback?: (item: T) => K): IPage<K>;
	setDto(dto: PaginationDto): IPage<T>;
	add<V>(key: string, value: V): IPage<T>;
}

export interface IMeta {
	total?: number;
	limit?: number;
	page?: number;
	totalPage?: number;
}
