import { Module } from '@nestjs/common';
import { CagegoryService } from './services/cagegory/cagegory.service';
import { CagegoryController } from './controllers/cagegory/cagegory.controller';
import { Repository } from 'typeorm';

@Module({
  providers: [CagegoryService, Repository],
  controllers: [CagegoryController]
})
export class CategoryModule {}
