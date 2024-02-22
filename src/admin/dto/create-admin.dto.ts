import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';


export class CreateAdminDto {
  @ApiProperty({ example: 'Sobir', description: 'Foydalanuvchi ismi' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Foydalanuvchi familyasi' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'user1', description: 'Foydalanuchi nomi' })
  @IsNotEmpty()
  @IsString()
  username: string;

  login: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: '+998991234567', description: 'Foydalanuvchi phone' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'Confirm_password',
    description: 'Foydalanuvchi paroli',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  confirm_password: string;

  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @IsEmail()
  email: string;
}
