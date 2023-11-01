import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service'
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { Category } from './category.schema';
import { Note } from 'src/common/decorators/note.decorator';
import { CategoryDto } from './dto/create-category.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { ObjectIdDto } from 'src/common/dtos/objectId.dto';

@ApiController(Category.path)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @Note('lấy tất cả danh mục ')
  async finall(){
    return await this.categoryService.findAll()
  }

  @Get('/:id')
  @Note('lấy  danh mục theo id ')
  async finById(@Param() param: ObjectIdDto){
    return await this.categoryService.findById(param.id)
  }

  @Post('/')
  @Roles("ROOT")
  @Note('Tạo danh mục')
  async createCate(@Body() dto :CategoryDto){
    return await this.categoryService.create(dto)
  }

  @Put('/:id')
  @Roles("ROOT")
  @Note('Update danh muc')
  async updateCate(
    @Param() param : ObjectIdDto,
    @Body() dto :CategoryDto){
    return await this.categoryService.updateById(param.id,dto)
  }

  @Delete('/:id')
  @Roles("ROOT")
  @Note('xóa danh mục')
  async deleteCate(
    @Param() param : ObjectIdDto){
    return await this.categoryService.deleteById(param.id)
  }
}
