import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServicesModule } from './service/services.module';
import { EmployeeServiceModule } from './employee_service/employee_service.module';
import { EmployeeModule } from './employee/employee.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { RegionModule } from './region/region.module';
import { Service } from './service/models/service.model';
import { Region1 } from './region/models/region.model';
import { Order } from './order/models/order.model';
import { EmployeeService } from './employee_service/models/employee_service.model';
import { Employee1 } from './employee/models/employee.model';
import { AuthModule } from './auth/auth.module';
import { Customer } from './customer/models/customer.model';
import { Admin } from './admin/models/admin.model';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),

      database: process.env.POSTGRES_DB,
      models: [
        Service,
        Region1,
        Order,
        Employee1,
        EmployeeService,
        Customer,
        Admin,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    AuthModule,
    ServicesModule,
    EmployeeServiceModule,
    EmployeeModule,
    OrderModule,
    CustomerModule,
    AdminModule,
    RegionModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
