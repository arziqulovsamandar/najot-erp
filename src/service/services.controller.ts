import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Service_Services } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Service } from './models/service.model';

@Controller('services')
export class  ServicesController{
  constructor(private readonly service:  Service_Services) {}

  @ApiOperation({ summary: 'All Venue_Type' })
  @Get()
  async findAll(): Promise<Service[]> {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Id Serach Venue_Type' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Service> {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Create Venue_Type' })
  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<Service> {
    return this.service.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Update Venue_Type' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.service.update(id, updateTypeDto);
  }

  @ApiOperation({ summary: 'Delete Venue_Type' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    
    return this.service.delete(id);
  }
}

