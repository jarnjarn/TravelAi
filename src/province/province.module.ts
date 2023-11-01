import { Global, Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Province, ProvinceSchema } from './province.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Province.name, schema: ProvinceSchema }])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports:[ProvinceService]
})
export class ProvinceModule {}
