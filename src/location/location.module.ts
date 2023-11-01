import { Global, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './location.schema';
import { CategoryService } from 'src/category/category.service';

@Global()
@Module({
  imports:[MongooseModule.forFeature([{name:Location.name,schema:LocationSchema}])],
  controllers: [LocationController],
  providers: [LocationService],
  exports:[LocationService]
})
export class LocationModule {}
