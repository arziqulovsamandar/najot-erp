import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({ example: '1', description: 'employee_id' })
  employee_id: number;

  @ApiProperty({ example: '1', description: 'customer_id' })
  customer_id: number;

  @ApiProperty({ example: '1', description: 'service_id' })
  service_id: number;

  @ApiProperty({ example: '2021-02-02', description: 'start_date_time' })
  @IsNotEmpty()
  @IsString()
  start_date_time: Date;

  @ApiProperty({ example: '2020-02-20', description: 'finish_date_time' })
  @IsNotEmpty()
  @IsString()
  finish_date_time: Date;
}
