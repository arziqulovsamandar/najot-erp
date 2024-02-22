import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region1 } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region1)
    private readonly regionModel: typeof Region1,
  ) {}

  async findAll(): Promise<Region1[]> {
    return this.regionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Region1> {
    return this.regionModel.findByPk(id);
  }

  async create(createServiceDto: CreateRegionDto): Promise<Region1> {
    return this.regionModel.create(createServiceDto);
  }

  async update(
    id: number,
    updateServiceDto: UpdateRegionDto,
  ): Promise<Region1> {
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
