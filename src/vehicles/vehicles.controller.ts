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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The vehicle has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Missing/incorrect data in the request body.',
  })
  @ApiResponse({
    status: 409,
    description: 'Vehicle already exists.',
  })
  async create(@Body() dto: CreateVehicleDto) {
    return await this.vehiclesService.create(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The vehicles have been successfully found.',
  })
  async findAll() {
    return await this.vehiclesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The vehicle has been successfully found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid parameter.',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const vehicle = await this.vehiclesService.findOne(id);
    if (!vehicle) {
      throw new NotFoundException();
    }
    return vehicle;
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 201,
    description: 'The vehicle has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request: Invalid parameter or missing/incorrect data in the request body.',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found.',
  })
  @HttpCode(201)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateVehicleDto,
  ) {
    const vehicle = await this.vehiclesService.update(id, dto);
    if (!vehicle) {
      throw new NotFoundException();
    }
    return vehicle;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'The vehicle has been successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid parameter.',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found.',
  })
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const vehicle = await this.vehiclesService.remove(id);
    if (!vehicle) {
      throw new NotFoundException();
    }
  }
}
