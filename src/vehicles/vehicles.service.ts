import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly repository: Repository<Vehicle>,
  ) {}

  async create(dto: CreateVehicleDto) {
    const vehicle = this.repository.create(dto);

    try {
      return await this.repository.save(vehicle);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Veículo com placa, chassi ou renavam já cadastrado',
        );
      }

      throw error;
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateVehicleDto) {
    const vehicle = await this.repository.findOneBy({ id });

    if (!vehicle) {
      return null;
    }

    this.repository.merge(vehicle, dto);
    return this.repository.save(vehicle);
  }

  async remove(id: string) {
    const vehicle = await this.repository.findOneBy({ id });

    if (!vehicle) {
      return null;
    }

    return this.repository.remove(vehicle);
  }
}
