import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { Employee1Service } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Employee1 } from './models/employee.model';
import { AddRoleDto } from '../employee/dto/add-role.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: Employee1Service) {}

  @ApiOperation({ summary: 'Roleni acitve qilish' })
  @HttpCode(200)
  @Post('active_user')
  activeUser(@Body() addRoleDto: AddRoleDto) {
    return this.employeeService.activateEmployee1(addRoleDto);
  }

  @ApiOperation({ summary: 'Roleni reactive qilish' })
  @HttpCode(200)
  @Post('reactive_user')
  reactiveUser(@Body() addRoleDto: AddRoleDto) {
    return this.employeeService.reactivateEmployee1(addRoleDto);
  }

  @ApiOperation({ summary: 'All Employee1' })
  @Get()
  async findAll(): Promise<Employee1[]> {
    return this.employeeService.findAll();
  }

  @ApiOperation({ summary: 'Id Serach Employee1' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee1> {
    return this.employeeService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Employee1' })
  @Post()
  async createEmployee1(
    @Body() createEmployee1Dto: CreateEmployeeDto,
  ): Promise<Employee1> {
    return this.employeeService.createEmployee1(createEmployee1Dto);
  }

  @ApiOperation({ summary: 'Update EmployeeService' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateEmployeeDto,
  ): Promise<Employee1> {
    return this.employeeService.update(id, updateTypeDto);
  }

  @ApiOperation({ summary: 'Delete Employee1' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.employeeService.delete(id);
  }
}
