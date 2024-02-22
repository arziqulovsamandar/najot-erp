import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {

  
  @ApiProperty({ example: 'Sobir', description: 'Foydalanuvchi ismi' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
