import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeeServiceService } from './employee_service.service';
import { CreateEmployeeServiceDto } from './dto/create-employee_service.dto';
import { UpdateEmployeeServiceDto } from './dto/update-employee_service.dto';
import { ApiOperation } from '@nestjs/swagger';
import { EmployeeService } from './models/employee_service.model';

@Controller('employee-service')
export class EmployeeServiceController {
  constructor(
    private readonly employeeServiceService: EmployeeServiceService,
  ) {}

  @ApiOperation({ summary: 'All EmployeeService' })
  @Get()
  async findAll(): Promise<EmployeeService[]> {
    return this.employeeServiceService.findAll();
  }

  @ApiOperation({ summary: 'Id Serach EmployeeService' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EmployeeService> {
    return this.employeeServiceService.findOne(id);
  }

  @ApiOperation({ summary: 'Create EmployeeService' })
  @Post()
  async create(@Body() createServiceDto: CreateEmployeeServiceDto): Promise<EmployeeService> {
    return this.employeeServiceService.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Update EmployeeService' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateEmployeeServiceDto,
  ): Promise<EmployeeService> {
    return this.employeeServiceService.update(id, updateTypeDto);
  }

  @ApiOperation({ summary: 'Delete EmployeeService' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.employeeServiceService.delete(id);
  }
}
