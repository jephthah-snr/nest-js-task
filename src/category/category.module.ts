import { Module } from '@nestjs/common';
import { CategoryService } from './services/cagegory/category.service';
import { categoryController } from './controllers/cagegory/category.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from '../typeorm/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, Repository],
  controllers: [categoryController]
})
export class CategoryModule {}
