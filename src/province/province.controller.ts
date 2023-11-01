import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { Province } from './province.schema';
import { Note } from 'src/common/decorators/note.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { ObjectIdDto } from 'src/common/dtos/objectId.dto';
import { ProvinceDto } from './dto/province.dto';

@ApiController(Province.path)
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/')
  @Note('lấy tất cả tỉnh ')
  async finall(){
    return await this.provinceService.findAll()
  }

  @Get('/:id')
  @Roles("ROOT")
  @Note('lấy tỉnh theo id ')
  async finById(@Param() param: ObjectIdDto){
    return await this.provinceService.findById(param.id)
  }

  @Post('/')
  @Roles("ROOT")
  @Note('Tạo tinhr')
  async createCate(@Body() dto :ProvinceDto){
    return await this.provinceService.create(dto)
  }

  @Put('/:id')
  @Roles("ROOT")
  @Note('Update tinh')
  async updateCate(
    @Param() param : ObjectIdDto,
    @Body() dto :ProvinceDto){
    return await this.provinceService.updateById(param.id,dto)
  }

  @Delete('/:id')
  @Roles("ROOT")
  @Note('xóa tỉnh')
  async deleteCate(
    @Param() param : ObjectIdDto){
    return await this.provinceService.deleteById(param.id)
  }
  
}
