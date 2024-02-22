import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeServiceDto } from './create-employee_service.dto';

export class UpdateEmployeeServiceDto extends PartialType(CreateEmployeeServiceDto) {}
