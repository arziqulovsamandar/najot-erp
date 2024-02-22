import { Module } from '@nestjs/common';
import { EmployeeServiceService } from './employee_service.service';
import { EmployeeServiceController } from './employee_service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from '../service/models/service.model';
import { Employee1 } from '../employee/models/employee.model';
import { EmployeeService } from './models/employee_service.model';

@Module({
  imports: [
    SequelizeModule.forFeature([EmployeeService,Employee1,Service]),
  ],
  controllers: [EmployeeServiceController],
  providers: [EmployeeServiceService],
  exports:[EmployeeServiceService]
})
export class EmployeeServiceModule {}
