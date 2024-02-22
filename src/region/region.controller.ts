import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Region1 } from './models/region.model';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'All Region' })
  @Get()
  async findAll(): Promise<Region1[]> {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Id Serach Region' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Region1> {
    return this.regionService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Region' })
  @Post()
  async create(@Body() createServiceDto: CreateRegionDto): Promise<Region1> {
    return this.regionService.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Update Region' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateRegionDto,
  ): Promise<Region1> {
    return this.regionService.update(id, updateTypeDto);
  }

  @ApiOperation({ summary: 'Delete Region' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.regionService.delete(id);
  }
}
