import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employee1 } from './models/employee.model';
import { ActivateEmployeeDto } from './dto/activate-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class Employee1Service {
  constructor(
    @InjectModel(Employee1)
    private readonly Employee1Model: typeof Employee1, // private readonly roleService: RolesServise,
  ) {}

  async findAll(): Promise<Employee1[]> {
    return this.Employee1Model.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Employee1> {
    return this.Employee1Model.findByPk(id);
  }

  async findByLogin(login: string): Promise<Employee1> {
    return this.Employee1Model.findOne({ where: { login } });
  }

  async createEmployee1(createEmployee1Dto: CreateEmployeeDto) {
    return this.Employee1Model.create(createEmployee1Dto);
  }

  async delete(id: number) {
    await this.Employee1Model.destroy({ where: { id } });
    return { message: "Foydalanuvchi o'chirildi" };
  }

  async getEmployee1ByLogin(login: string) {
    const Employee1 = await this.Employee1Model.findOne({
      where: { login },
      include: { all: true },
    });
    return Employee1;
  }

  async activateEmployee1(activateEmployee1Dto: ActivateEmployeeDto) {
    const Employee1 = await this.Employee1Model.findByPk(
      activateEmployee1Dto.employeeId,
    );
    if (!Employee1) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    Employee1.is_active = true;
    await Employee1.save();
    return Employee1;
  }

  async reactivateEmployee1(activateEmployee1Dto: ActivateEmployeeDto) {
    const Employee1 = await this.Employee1Model.findByPk(
      activateEmployee1Dto.employeeId,
    );
    if (!Employee1) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    Employee1.is_active = false;
    await Employee1.save();
    return Employee1;
  }

  async update(
    id: number,
    updateServiceDto: UpdateEmployeeDto,
  ): Promise<Employee1> {
    const builder = await this.Employee1Model.update(updateServiceDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0].dataValues;
  }
}
