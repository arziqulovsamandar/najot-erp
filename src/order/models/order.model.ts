import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Service } from '../../service/models/service.model';
import { Customer } from '../../customer/models/customer.model';
import { Employee1 } from '../../employee/models/employee.model';

interface OrderAtr {
  employee_id: number;
  customer_id: number;
  start_date_time: Date;
  finish_date_time: Date;
  service_id: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAtr> {
  @ApiProperty({ example: 1, description: 'UNIQUE ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Employee1)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  employee_id: number;

  @BelongsTo(() => Employee1)
  employee: Employee1;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ApiProperty({ example: '2020-02-02', description: 'start_date_time' })
  @Column({
    type: DataType.DATE,
  })
  start_date_time: Date;

  @ApiProperty({ example: '2020-02-02', description: 'finish_date_time' })
  @Column({
    type: DataType.DATE,
  })
  finish_date_time: Date;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  service_id: number;

  @BelongsTo(() => Service)
  service: Service;
}
