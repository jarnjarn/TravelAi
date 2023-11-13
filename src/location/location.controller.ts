import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { Note } from 'src/common/decorators/note.decorator';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { CreateLocationDto, LocationDto, LocationPagination, LocationUpdateImgDto, UpdateLocationDto, pageDto } from './dto/location.dto';
import { CategoryService } from 'src/category/category.service';
import { Upload } from 'src/common/decorators/upload.decorator';
import { Location } from './location.schema';
import { ListException } from 'src/common/errors/list.error';
import { ProvinceService } from '../province/province.service';
import { ObjectIdDto } from 'src/common/dtos/objectId.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiController('location')
export class LocationController {
	constructor(private readonly locationService: LocationService, private readonly categoryService: CategoryService, private readonly provinceService: ProvinceService) {}

	@Get('')
	@Note('Lấy dánh sách địa điển du lịch')
	async finAll(@Query() dto: pageDto) {
		return await this.locationService.getPage(dto);
	}

	@Get(':id')
	@Note('Lấy thông tin chi tiết Địa điểm')
	async findById(@Param() param: ObjectIdDto) {
		return await this.locationService.getById(param.id);
	}

	@Post()
	@Note('Tạo địa điểm mới')
	@Upload('img', Location.name)
	async create(@Body() dto: CreateLocationDto) {
		const category = await this.categoryService.findById(dto.category).orThrow(ListException.CATEGORY_NOT_FOUND);
		const province = await this.provinceService.findById(dto.province).orThrow(ListException.PROVINCE_NOT_FOUND);

		return await this.locationService.create({
			...dto,
			province: province,
			category: category,
		});
	}

	@Put(':id')
	@Note('update')
	async update(@Param() param: ObjectIdDto, @Body() dto: UpdateLocationDto) {
		const location = await this.locationService.findOne({ _id: param.id }).orThrow(ListException.LOCATION_NOT_FOUND);
		const category = await this.categoryService.findById(dto.category).orThrow(ListException.CATEGORY_NOT_FOUND);
		const province = await this.provinceService.findById(dto.province).orThrow(ListException.PROVINCE_NOT_FOUND);
		return await this.locationService.updateById(param.id, {
			...dto,
			province: province,
			category: category,
		});
	}

	@Put('/updateImg/:id')
	@Upload('img', Location.name)
	@Public()
	async uploadImg(@Param() param: ObjectIdDto, @Body() dto: LocationUpdateImgDto) {
		return await this.locationService.updateById(param.id, {
			...dto,
		});
	}

	@Delete(':id')
	@Note('xóa địa điểm du lịch')
	async delete(@Param() param: ObjectIdDto) {
		return await this.locationService.deleteById(param.id);
	}

}

