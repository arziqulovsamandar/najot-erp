import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "../../order/models/order.model";
import { EmployeeService } from "../../employee_service/models/employee_service.model";

interface ServiceAttr{
    name:string
}

@Table({ tableName: 'services' })
export class Service extends Model<Service, ServiceAttr> {
  @ApiProperty({ example: 1, description: 'UNIQUE ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Sobir', description: 'Foydalanuvchi ismi' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => Order)
  order: Order[];

  @HasMany(() => EmployeeService)
  employeeService: EmployeeService[];
}
