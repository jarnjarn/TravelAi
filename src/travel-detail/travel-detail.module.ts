import { Global, Module } from '@nestjs/common';
import { TravelDetailService } from './travel-detail.service';
import { TravelDetailController } from './travel-detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelDetail, TravelDetailSchema } from './travel-detail.schema';

@Global()
@Module({
  imports:[MongooseModule.forFeature([{name:TravelDetail.name,schema:TravelDetailSchema}])],
  controllers: [TravelDetailController],
  providers: [TravelDetailService],
  exports:[TravelDetailService]
})
export class TravelDetailModule {}
