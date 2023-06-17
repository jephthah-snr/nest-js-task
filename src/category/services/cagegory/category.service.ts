import { HttpStatus, Injectable } from '@nestjs/common';
import AppError from '../../../shared/error';
import { Repository } from 'typeorm';
import Category from '../../../typeorm/entities/category.entity';
import { CategoryType } from '../../type';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: Repository<Category>){}

    async findByName(name: string){
        try {
            const exist = await this.categoryRepository.find({
                where:{
                    name: name
                }
            })

            if(!exist) throw new AppError(HttpStatus.NOT_FOUND, "the category specified does not exist, create this category")

            return exist
        } catch (error) {
            throw error
        }
    }

    async findAll(){
        const all = await this.categoryRepository.find()
        return all
    }

    async findById(id: string) {
        try {
            const category = await this.categoryRepository.findOneBy({id})

            if(!category) throw new AppError(HttpStatus.NOT_FOUND, "category not found")

            return category
        } catch (error) {
            throw error
        }
    }

    async createCategory(payload: CategoryType){
        try {
            const find = await this.categoryRepository.find({
                where: {
                    name: payload.name
                }
            })
            if(find) throw new AppError(HttpStatus.UNAUTHORIZED, "Category already exists, please use a dierent name of your category")

            const response = await this.categoryRepository.create(payload)
        } catch (error) {
            throw error
        }
    }

    async updateById(id: string, updateParam: CategoryType) {
        try {

            const exists = await this.categoryRepository.findOneBy({id})

            if(!exists) throw new AppError(HttpStatus.UNAUTHORIZED, "Category does not exist")

            const response = await this.categoryRepository.update({id}, (updateParam))

            return response
        } catch (error) {
            throw error
        }
    }

    async deleteId(id: string) {
        try {
            const category = await this.categoryRepository.findOneBy({id})

            if(!category) throw new AppError(HttpStatus.NOT_FOUND, "category not found")

            await this.categoryRepository.delete(id)
        } catch (error) {
            throw error
        }
    }
}
