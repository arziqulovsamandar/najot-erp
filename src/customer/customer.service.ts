import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './models/customer.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private readonly regionModel: typeof Customer,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.regionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Customer> {
    return this.regionModel.findByPk(id);
  }

  async create(createServiceDto: CreateCustomerDto): Promise<Customer> {
    return this.regionModel.create(createServiceDto);
  }

  async update(
    id: number,
    updateServiceDto: UpdateCustomerDto,
  ): Promise<Customer> {
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
