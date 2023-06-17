import { Controller, Get, Post, Patch, Delete, Req, Res, HttpStatus, Param, Body } from '@nestjs/common';
import { CategoryService } from '../../services/cagegory/category.service';
import { Logger } from '@nestjs/common';
import { ErrorResponse, SuccessResponse } from '../../../utils/response.util';
import { Request, Response } from 'express';
import AppError from '../../../shared/error';
import { CategoryDto } from '../../type';



@Controller('cagegory')
export class CagegoryController {
    constructor(
        private readonly categoryService:CategoryService){}
    
    @Get()
    async getAllCategories(@Req() req: Request, @Res() res: Response){
        try {
            const response = await this.categoryService.findAll()
            
            return res.status(HttpStatus.OK).send(SuccessResponse("all categories", response))

        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }

    @Get(":name")
    async getByName(@Req() req: Request, @Res() res: Response, @Param() name){
        try {
            const exist = await this.categoryService.findByName(name)

            if(!exist) throw new AppError(HttpStatus.NOT_FOUND, "no such category exists")

            return res.status(HttpStatus.OK).send(SuccessResponse("category gotten", exist))
            
        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }


    @Post("create/category")
    async createCategory(@Body() categoryDto: CategoryDto, @Req() req: Request, @Res() res: Response){
        try {
            const exists = await this.categoryService.findByName(categoryDto.name)

            if(exists) throw new AppError(HttpStatus.UNAUTHORIZED, "category wut this name alrady exists.")

            const response = await this.categoryService.createCategory(categoryDto)

            return res.status(HttpStatus.OK).send(SuccessResponse("category created", response))
        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }

    @Delete(":id")
    async deleteCategory(@Param() id, @Req() req: Request, @Res() res: Response){
        try {
            const cagegory = await this.categoryService.findById(id)

            if(!cagegory) throw new AppError(HttpStatus.NOT_FOUND, "this category does not exist");

            const response  = await this.categoryService.deleteId(id)

            return res.status(HttpStatus.OK).send(SuccessResponse("Category deleted successfully", response))

        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }
}
