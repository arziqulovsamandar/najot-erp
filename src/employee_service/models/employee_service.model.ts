import { ApiProperty } from "@nestjs/swagger";

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee1 } from "../../employee/models/employee.model";
import { Service } from "../../service/models/service.model";

interface Employee_serviceAtr{
    service_id:number;
    employee_id:number;
    price:bigint
}

@Table({ tableName: 'employee_service' })
export class EmployeeService extends Model<
  EmployeeService,
  Employee_serviceAtr
> {
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

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  service_id: number;

  @BelongsTo(() => Service)
  service: Service;

  @ApiProperty({ example: '200', description: 'price' })
  @Column({
    type: DataType.BIGINT,
  })
  price: bigint;
}
