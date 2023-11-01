import { PickType } from "@nestjs/swagger"
import { Province } from '../province.schema';

export class ProvinceDto extends PickType(Province,['name','describe'])
{
	
}
