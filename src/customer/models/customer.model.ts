import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region1 } from "../../region/models/region.model";
import { Order } from "../../order/models/order.model";

interface CustomerAtr{
    last_name:string;
    first_name:string;
    phone:string;
    email:string;
    region_id:number;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerAtr> {
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
    example: '912145787',
    description: 'Foydalanuvchi telefoni',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ForeignKey(() => Region1)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  region_id: number;

  @BelongsTo(() => Region1)
  region: Region1;

  @HasMany(() => Order)
  order: Order[];
}
