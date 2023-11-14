import { ApiProperty, PickType } from "@nestjs/swagger";
import { TravelSchedule } from "../travelSchedule.schema";
import { ToObjectId } from "src/common/transforms/objectid.transform";
import { Types } from "mongoose";
import { TravelDetail } from "src/travel-detail/travel-detail.schema";
import { travelStatus } from "../enum/travel.enum";

export class TravelScheduleCreateDto extends PickType(TravelSchedule,['dayStart','dayEnd']){

	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	user: Types.ObjectId;

	@ApiProperty({ example: '1,1', type: String })
	locationUser: String;

	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	category: Types.ObjectId;

	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	province: Types.ObjectId;
    
}

export class TravelScheduleUpdateDto{
	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	location: Types.ObjectId;

}

export class TimeUpdateDto extends PickType(TravelSchedule,['dayStart','dayEnd']){}
export class StatusUpdateDto {
	@ApiProperty({required: true, type: String, enum : travelStatus})
	status: travelStatus
}
