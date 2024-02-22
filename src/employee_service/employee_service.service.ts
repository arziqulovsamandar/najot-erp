import { Injectable } from '@nestjs/common';
import { CreateEmployeeServiceDto } from './dto/create-employee_service.dto';
import { UpdateEmployeeServiceDto } from './dto/update-employee_service.dto';
import { EmployeeService } from './models/employee_service.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EmployeeServiceService {
  constructor(
    @InjectModel(EmployeeService)
    private readonly regionModel: typeof EmployeeService,
  ) {}

  async findAll(): Promise<EmployeeService[]> {
    return this.regionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<EmployeeService> {
    return this.regionModel.findByPk(id);
  }

  async create(createServiceDto: CreateEmployeeServiceDto): Promise<EmployeeService> {
    return this.regionModel.create(createServiceDto);
  }

  async update(id: number, updateServiceDto: UpdateEmployeeServiceDto): Promise<EmployeeService> {
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
