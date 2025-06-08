import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateVehicleDto) {
    return await this.vehiclesService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vehicle = await this.vehiclesService.findOne(id);
    if (!vehicle) {
      throw new NotFoundException();
    }
    return vehicle;
  }

  @Patch(':id')
  @HttpCode(201)
  async update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    const vehicle = await this.vehiclesService.update(id, dto);
    if (!vehicle) {
      throw new NotFoundException();
    }
    return vehicle;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const vehicle = await this.vehiclesService.remove(id);
    if (!vehicle) {
      throw new NotFoundException();
    }
  }
}
