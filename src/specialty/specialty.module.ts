import { Global, Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialty, SpecialtySchema } from './specilty.schema';

@Global()
@Module({
  imports:[MongooseModule.forFeature([{name: Specialty.name, schema : SpecialtySchema}])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
  exports:[SpecialtyService]
})
export class SpecialtyModule {}
