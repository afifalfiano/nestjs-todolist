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

  async deleteCategory(uuid: string) {
    const category = await this.categoryRepository.findOneBy({ uuid });
    if (!category) {
      throw new HttpException('Category Not Found!', HttpStatus.BAD_REQUEST);
    }
    return this.categoryRepository.delete(uuid);
  }
  async updateCategory(uuid: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ uuid });
    if (!category) {
      throw new HttpException('Category Not Found!', HttpStatus.BAD_REQUEST);
    }
    return this.categoryRepository.update({ uuid }, { ...updateCategoryDto });
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryRepository.create({
      ...createCategoryDto,
    });
    const saveCategory = await this.categoryRepository.save(newCategory);
    const remapCategory = { ...saveCategory };
    delete remapCategory.id;
    return remapCategory;
  }
  async findById(uuid: string) {
    const category = await this.categoryRepository.findOne({
      where: { uuid },
      relations: ['todolists'],
    });
    if (!category) {
      throw new HttpException('Category Not Found!', HttpStatus.BAD_REQUEST);
    }
    const remapCategory = {
      ...category,
      todolists: category.todolists.map((item) => {
        delete item.id;
        return { ...item };
      }),
    };
    delete remapCategory.id;
    return remapCategory;
  }
  async findAll(search = '') {
    let data = await this.categoryRepository.find({ relations: ['todolists'] });

    if (search.length > 0) {
      const datas = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category.name like :search', { search: `%${search}%` })
        .orderBy('category.name', 'ASC')
        .getMany();
      data = datas.map((item) => {
        delete item.id;
        return { ...item };
      });
    } else {
      data = data.map((item) => {
        delete item.id;
        return {
          ...item,
          todolists: item.todolists.map((item) => {
            delete item.id;
            return { ...item };
          }),
        };
      });
    }

    return data;
  }
}
