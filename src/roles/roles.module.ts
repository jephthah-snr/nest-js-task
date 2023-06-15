import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Roles from '../typeorm/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
