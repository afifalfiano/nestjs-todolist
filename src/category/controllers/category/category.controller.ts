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

  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findById(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
