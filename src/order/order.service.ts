import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly regionModel: typeof Order,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.regionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Order> {
    return this.regionModel.findByPk(id);
  }

  async create(createServiceDto: CreateOrderDto): Promise<Order> {
    return this.regionModel.create(createServiceDto);
  }

  async update(
    id: number,
    updateServiceDto: UpdateOrderDto,
  ): Promise<Order> {
    const builder = await this.regionModel.update(updateServiceDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0].dataValues;
  }

  async delete(id: number): Promise<void> {
    const numRowsDeleted = await this.regionModel.destroy({
      where: { id },
    });

    if (numRowsDeleted === 0) {
      throw new Error(`Could not delete venue type with id ${id}`);
    }
  }
}
