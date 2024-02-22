import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './models/service.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class Service_Services {
  constructor(
    @InjectModel(Service)
    private readonly ServiceModel: typeof Service,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.ServiceModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Service> {
    return this.ServiceModel.findByPk(id);
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.ServiceModel.create(createServiceDto);
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const builder = await this.ServiceModel.update(updateServiceDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0].dataValues;
  }

  async delete(id: number): Promise<void> {
    const numRowsDeleted = await this.ServiceModel.destroy({
      where: { id },
    });

    if (numRowsDeleted === 0) {
      throw new Error(`Could not delete venue type with id ${id}`);
    }
  }
}
