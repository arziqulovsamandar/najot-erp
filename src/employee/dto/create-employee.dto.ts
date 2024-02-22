import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsDateString, IsStrongPassword, MinLength } from "class-validator";


export class CreateEmployeeDto {
  @ApiProperty({ example: 'Sobir', description: 'Foydalanuvchi ismi' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Foydalanuvchi familyasi' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'true', description: 'Foydalanuvchi is_active' })
  @IsNotEmpty()
  @IsString()
  is_active: boolean;

  @ApiProperty({ example: 'toshkent', description: 'Foydalanuchi manzili' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 'login', description: 'Foydalanuchi logini' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998991234567', description: 'Foydalanuvchi phone' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  hashed_password: string;
}
