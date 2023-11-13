
import { Description } from '../decorators/description.decorator';
import { ListApiException } from '../decorators/listApiException.decorator';
import { ApiException } from './apiException.error';
import { HttpStatus } from '@nestjs/common';
function fn(status:number,message)
{
	const result = {status,message};
	return result as any as ApiException;
}

@ListApiException()
export class ListException
{
	static USER_NOT_FOUND = fn(HttpStatus.NOT_FOUND,"User không tồn tại")
	static USER_EXIST = fn(HttpStatus.BAD_REQUEST,"User đã tồn tại")
	static USER_NOT_ACTIVE = fn(HttpStatus.BAD_REQUEST,"User chưa được active")
	static USER_PASSWORD_NOT_MATCH = fn(HttpStatus.BAD_REQUEST,"Sai mật khẩu")
	static NOT_FOUND = fn(HttpStatus.BAD_REQUEST,"không tồn tại")
	static PROVINCE_NOT_FOUND = fn(HttpStatus.NOT_FOUND,"TỈNH không tồn tại")
	static CATEGORY_NOT_FOUND = fn(HttpStatus.NOT_FOUND,"DANH MỤC không tồn tại")
	static LOCATION_NOT_FOUND = fn(HttpStatus.NOT_FOUND,"địa điểm không tồn tại")
	static TRAVELSCHEDULE_NOT_FOUND = fn(HttpStatus.NOT_FOUND,"LICH TRINH không tồn tại")
}
