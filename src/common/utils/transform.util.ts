import { Transform,TransformFnParams } from "class-transformer";
import { Types } from "mongoose";

export class TransformUtil
{
	static toObjectId(fn:TransformFnParams)
	{
		const { value } = fn;
		return new Types.ObjectId(value);
	}
}