import { ApiProperty, PickType } from "@nestjs/swagger";
import { TravelSchedule } from "../travelSchedule.schema";
import { ToObjectId } from "src/common/transforms/objectid.transform";
import { Types } from "mongoose";
import { TravelDetail } from "src/travel-detail/travel-detail.schema";

export class TravelScheduleCreateDto extends PickType(TravelSchedule,['coordinates','dayStart','dayEnd']){

    @ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	User: Types.ObjectId;

	@ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	province: Types.ObjectId;

    @ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	category: Types.ObjectId;

    
}
