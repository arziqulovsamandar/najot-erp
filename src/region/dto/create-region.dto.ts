import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
  @ApiProperty({ example: 'Toshkent', description: 'Foydalanuvchi viloyati' })
  @IsNotEmpty()
  @IsString()
  viloyat: string;

  @ApiProperty({ example: 'Olmazor', description: 'Foydalanuvchi tumani' })
  @IsNotEmpty()
  @IsString()
  tuman: string;

  @ApiProperty({ example: 'MIrzo Golib', description: 'Foydalanuvchi mahalasi' })
  @IsNotEmpty()
  @IsString()
  mahala: string;
}
