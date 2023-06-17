import { Module } from '@nestjs/common';
import { CategoryService } from './services/cagegory/category.service';
import { CagegoryController } from './controllers/cagegory/category.controller';
import { Repository } from 'typeorm';

@Module({
  providers: [CategoryService, Repository],
  controllers: [CagegoryController]
})
export class CategoryModule {}
