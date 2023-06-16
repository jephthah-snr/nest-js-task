import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { CagegoryService } from 'category/services/cagegory/cagegory.service';

@Controller('cagegory')
export class CagegoryController {
    constructor(
        private readonly cagegoryService:CagegoryService){}
    
    @Get()
    async getAllCategories(){

    }
}
