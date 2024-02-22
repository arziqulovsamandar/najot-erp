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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Order } from './models/order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'All Order' })
  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Id Serach Order' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Order' })
  @Post()
  async create(@Body() createServiceDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Update Order' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateTypeDto);
  }

  @ApiOperation({ summary: 'Delete Order' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.orderService.delete(id);
  }
}
