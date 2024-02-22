import { Controller, Get, Post, Body, Patch, Param, Delete ,Put} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Customer } from './models/customer.model';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @ApiOperation({ summary: 'All Customer' })
  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: 'Id Serach Customer' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Customer' })
  @Post()
  async create(@Body() createServiceDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Update Customer' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.update(id, updateTypeDto);
  }

  @ApiOperation({ summary: 'Delete Customer' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.customerService.delete(id);
  }
}
