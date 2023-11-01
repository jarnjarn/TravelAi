import { PickType } from "@nestjs/swagger"
import { Category } from "../category.schema"

export class CategoryDto extends PickType(Category,['name','describe'])
{
	
}
