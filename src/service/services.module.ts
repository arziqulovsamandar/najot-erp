import { Module } from '@nestjs/common';
import { Service_Services } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './models/service.model';

@Module({
  imports: [SequelizeModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [Service_Services],
  exports: [Service_Services],
})
export class ServicesModule {}
