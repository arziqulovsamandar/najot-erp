import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AdminAtr{
    username:string;
    email:string;
    hashed_password:string,
    phone:string;
    is_active:boolean,
    is_creator:boolean;
    login:string;
    hashed_refresh_token:string
}
@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAtr> {
  @ApiProperty({ example: 1, description: 'UNIQUE ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  login: string;

  @ApiProperty({ example: 'user1', description: 'Foydalanuvchi nomi' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: '912145787',
    description: 'Foydalanuvchi telefoni',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'password',
    description: 'Foydalanuvchi paroli',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

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
    example: 'false',
    description: 'Foydalanuvchi egasi yoki yo`qligi',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Foydalanuvchi tasdiqlangan holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'token',
    description: 'Foydalanuvchi tasdiqlangan holati',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  activation_link: string;
  
  first_name: any;
}
