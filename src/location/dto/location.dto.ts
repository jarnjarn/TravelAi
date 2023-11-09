import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsInt, IsOptional, Length, Max, Min } from "class-validator";
import { Types } from "mongoose";
import { PaginationDto } from "src/common/dtos/pageable.dto";
import { ToObjectId } from "src/common/transforms/objectid.transform";
import { Location } from "../location.schema";
import { ToNumber } from "src/common/transforms/number.transform";

export class CreateLocationDto extends PickType(Location,['name','address','img','coordinates','description']){
	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	category: Types.ObjectId;

	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	province: Types.ObjectId;
}


export class UpdateLocationDto extends PickType(Location,['name','address','coordinates','description']){
	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	category: Types.ObjectId;

	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	province: Types.ObjectId;
}

export class LocationUpdateImgDto extends PickType(Location, ['img']) {}



export class LocationPagination extends PartialType(PaginationDto) {
    @ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	@IsOptional()
	province: Types.ObjectId;

	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	@IsOptional()
	category: Types.ObjectId;
    
}

export class LocationDto {

	@ApiProperty({
		description: 'Tọa độ',
		example: '20.981971,105.864323',
	})
	@Length(1, 255)
	locationUser: string;


	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	category: Types.ObjectId;

	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	province: Types.ObjectId;
    
}

export class pageDto extends PartialType(PaginationDto){}