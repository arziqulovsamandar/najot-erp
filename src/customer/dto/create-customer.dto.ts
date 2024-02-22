import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber } from 'class-validator';


export class CreateCustomerDto {
  @ApiProperty({ example: 'Sobir', description: 'Foydalanuvchi ismi' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Foydalanuvchi familyasi' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  // @ApiProperty({ example: 'toshkent', description: 'Foydalanuchi manzili' })
  // @IsNotEmpty()
  // @IsString()
  // address: string;

  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998991234567', description: 'Foydalanuvchi phone' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: '1', description: 'Foydalanuvchi id' })
  region_id: number;
}
