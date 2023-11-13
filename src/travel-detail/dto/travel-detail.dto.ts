import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { ToObjectId } from "src/common/transforms/objectid.transform";

export class weatherDto {
    @ApiProperty({description:'vĩ độ', example:'2.321'})
    lat : String

    @ApiProperty({description:'kinh độ', example:'2.321'})
    lon : String
}

export class createTraVelDetail{
    @ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	location: Types.ObjectId;
}
