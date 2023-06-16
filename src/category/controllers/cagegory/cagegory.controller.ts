import { Controller, Get, Post, Patch, Delete, Req, Res, HttpStatus, Param, Body } from '@nestjs/common';
import { CagegoryService } from '../../../category/services/cagegory/cagegory.service';
import { Logger } from '@nestjs/common';
import { ErrorResponse, SuccessResponse } from '../../../utils/response.util';
import { Request, Response } from 'express';
import AppError from '../../../shared/error';
import { CategoryDto } from '../../../category/type';



@Controller('cagegory')
export class CagegoryController {
    constructor(
        private readonly cagegoryService:CagegoryService){}
    
    @Get()
    async getAllCategories(@Req() req: Request, @Res() res: Response){
        try {
            const response = await this.cagegoryService.findAll()
            
            return res.status(HttpStatus.OK).send(SuccessResponse("all categories", response))

        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }

    @Get(":name")
    async getByName(@Req() req: Request, @Res() res: Response, @Param() name){
        try {
            const exist = await this.cagegoryService.findByName(name)

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
            const exists = await this.cagegoryService.findByName(categoryDto.name)

            if(exists) throw new AppError(HttpStatus.UNAUTHORIZED, "category wut this name alrady exists.")

            const response = await this.cagegoryService.createCategory(categoryDto)

            return res.status(HttpStatus.OK).send(SuccessResponse("category created", response))
        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }
}
