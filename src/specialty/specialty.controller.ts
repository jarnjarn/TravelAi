import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { LocationService } from '../location/location.service';
import { Note } from 'src/common/decorators/note.decorator';
import { SpecialtyCreateDto } from './dto/spevince.dto';
import { ListException } from 'src/common/errors/list.error';
import { ObjectIdDto } from 'src/common/dtos/objectId.dto';
import { Upload } from 'src/common/decorators/upload.decorator';
import { Specialty } from './specilty.schema';

@ApiController('specialty')
export class SpecialtyController {
	constructor(private readonly specialtyService: SpecialtyService, private readonly locationService: LocationService) {}

	@Post()
  @Upload('img',Specialty.name)
	@Note('tạo đặc sản')
	async create(@Body() dto: SpecialtyCreateDto) {
		const location = await this.locationService.findById(dto.location).orThrow(ListException.LOCATION_NOT_FOUND);
		return await this.specialtyService.create({ ...dto, location: location });
	}

	@Get()
	@Note('lấy danh sách review')
	async finAll() {
		return await this.specialtyService.findAll();
	}

	@Get(':id')
	@Note('thông tin chi tiết đặc sản')
	async getById(@Param() param: ObjectIdDto) {
		return await this.specialtyService.getById(param.id);
	}
	@Get('/specialtyBylocation/:id')
	@Note('thông tin chi tiết đặc sản')
	async getSpecialtyByidLocation(@Param() param: ObjectIdDto) {
		return await this.specialtyService.getSpecialtyByidLocation(param.id);
	}

	@Put(':id')
  @Upload('img',Specialty.name)
	@Note('Sửa thông tin đặc sản')
	async update(@Param() param: ObjectIdDto, @Body() dto: SpecialtyCreateDto) {
    const location = await this.locationService.findById(dto.location).orThrow(ListException.LOCATION_NOT_FOUND);
		return await this.specialtyService.updateById(param.id, { ...dto, location : location });
	}

  @Delete(':id')
  @Note('xóa')
  async delete(@Param() param: ObjectIdDto ){
    return await this.specialtyService.deleteById(param.id)
  }

}

