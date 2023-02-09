import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos';
import { CategoryEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new HttpException('Category Not Found!', HttpStatus.BAD_REQUEST);
    }
    return this.categoryRepository.delete(id);
  }
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new HttpException('Category Not Found!', HttpStatus.BAD_REQUEST);
    }
    return this.categoryRepository.update({ id }, { ...updateCategoryDto });
  }
  createCategory(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create({
      ...createCategoryDto,
    });
    return this.categoryRepository.save(newCategory);
  }
  async findById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {id},
      relations: ['todolists'],
    });
    if (!category) {
      throw new HttpException('Category Not Found!', HttpStatus.BAD_REQUEST);
    }
    return category;
  }
  findAll() {
    return this.categoryRepository.find({ relations: ['todolists'] });
  }
}
