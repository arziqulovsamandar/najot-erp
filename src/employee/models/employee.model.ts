import { ApiProperty } from '@nestjs/swagger';

import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from '../../order/models/order.model';

interface EmployeeAtr {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  phone: string;
  login: string;
  is_active: boolean;
  hashed_pasword: string;
  boshvaqti: boolean;
  hashed_refresh_token: string;
}
@Table({ tableName: 'employee' })
export class Employee1 extends Model<Employee1, EmployeeAtr> {
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
  first_name: string;

  @ApiProperty({ example: 'Bobirov', description: 'Foydalanuvchi familiyasi' })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Foydalanuvchi elektron pochtasi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'login',
    description: 'Foydalanuvchi logini',
  })
  @Column({
    type: DataType.STRING,
  })
  login: string;

  @ApiProperty({
    example: 'password',
    description: 'Foydalanuvchi paroli',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: '912145787',
    description: 'Foydalanuvchi telefoni',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'Toshkent',
    description: 'Foydalanuvchi manzili',
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Foydalanuvchi egasi yoki yo`qligi',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  boshvaqti: boolean;

  @ApiProperty({
    example: 'token',
    description: 'Foydalanuvchi tasdiqlangan holati',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @HasMany(() => Order)
  order: Order[];
}
