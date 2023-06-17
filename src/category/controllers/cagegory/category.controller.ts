import { Controller, Get, Post, Patch, Delete, Req, Res, HttpStatus, Param, Body } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ErrorResponse, SuccessResponse } from '../../../utils/response.util';
import { Request, Response } from 'express';
import AppError from '../../../shared/error';
import { CategoryService } from '../../../category/services/cagegory/category.service';



@Controller('category')
export class categoryController {
    constructor(
        private readonly categoryService:CategoryService){}



    @Get()
    async getAllCategories(@Req() req: Request, @Res() res: Response){
        try {
            const response = await this.categoryService.findAll()
            
            return res.status(HttpStatus.OK).send(SuccessResponse("all categories", response))

        } catch (error) {
            Logger.error({error})
            console.log(error)
            if(error instanceof AppError) return res.status(error.getStatus()).send(ErrorResponse(error.message));
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
    async createCategory(@Req() req: Request, @Res() res: Response){
        try {
           
            const response = await this.categoryService.createCategory(req.body)

            return res.status(HttpStatus.OK).send(SuccessResponse("category created", response))
        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }

    @Delete(":id")
    async deleteCategory(@Req() req: Request, @Res() res: Response){
        try {
            const category = await this.categoryService.findById(req.params.id)

            if(!category) throw new AppError(HttpStatus.NOT_FOUND, "this category does not exist");

            const response  = await this.categoryService.deleteId(category.id)

            return res.status(HttpStatus.OK).send(SuccessResponse("Category deleted successfully", response))

        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }
}
