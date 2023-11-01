import { ApiProperty, PickType } from "@nestjs/swagger";
import { Specialty } from '../specilty.schema';
import { ToObjectId } from "src/common/transforms/objectid.transform";
import { Types } from "mongoose";

export class SpecialtyCreateDto extends PickType(Specialty, ['name','img','price','describe']) {
    @ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	location: Types.ObjectId;
}

export class SpecialtyUpdateDto extends PickType(Specialty, ['name','price','describe']) {
    @ToObjectId()
	@ApiProperty({ example: '5f9d3f1b9d7b3a2f0c9e9b1a', type: String })
	location: Types.ObjectId;
}

export class SpecialtyUpdateImgDto extends PickType(Specialty, ['img']) {}