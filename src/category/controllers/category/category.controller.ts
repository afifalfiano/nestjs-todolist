import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from 'src/category/services/category/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos';
import { TransformInterceptor } from 'src/middlewares';
import { CONSTANT } from 'src/utils';

@UseInterceptors(TransformInterceptor)
@Controller({ path: CONSTANT.API_PREFIX + 'category', version: '1' })
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(@Query('search') search: string) {
    console.log(search, 'search');
    return this.categoryService.findAll(search);
  }

  @Get(':uuid')
  getCategoryById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.categoryService.findById(uuid);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':uuid')
  updateCategory(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(uuid, updateCategoryDto);
  }

  @Delete(':uuid')
  deleteCategory(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.categoryService.deleteCategory(uuid);
  }
}
