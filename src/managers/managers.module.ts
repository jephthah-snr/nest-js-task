import { Module } from '@nestjs/common';
import { ManagersController } from './controller/managers/managers.controller';
import { ManagersService } from './service/managers/managers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Managers from '../typeorm/entities/managers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Managers])],
  controllers: [ManagersController],
  providers: [ManagersService]
})
export class ManagersModule {}
