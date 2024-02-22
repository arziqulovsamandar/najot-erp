import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { Service } from '../service/models/service.model';
import { Customer } from '../customer/models/customer.model';
import { Employee1 } from '../employee/models/employee.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Order,Service,Customer,Employee1]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
