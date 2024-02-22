import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeServiceDto {
  @ApiProperty({ example: '1', description: 'employee_id' })
  employee_id: number;

  @ApiProperty({ example: '1', description: 'service_id' })
  service_id: number;

  @ApiProperty({ example: '200', description: 'price' })
  @IsNotEmpty()
  @IsString()
  price: bigint;
}
