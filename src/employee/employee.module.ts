import { Module } from '@nestjs/common';
import { Employee1Service } from './employee.service';
import { EmployeeController } from './employee.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee1 } from './models/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee1])],
  controllers: [EmployeeController],
  providers: [Employee1Service],
  exports: [Employee1Service],
})
export class EmployeeModule {}
