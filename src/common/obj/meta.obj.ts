import { IMeta } from '../interfaces/page.interface';

export class Meta implements IMeta {
	total?: number;
	limit: number;
	page: number;
	totalPage: number;
	constructor(data: IMeta) {
		this.total = data?.total;
		this.limit = data?.limit;
		this.page = data?.page;
		this.totalPage = data?.totalPage;
	}
}
