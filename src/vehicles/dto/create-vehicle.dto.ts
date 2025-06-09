import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'ABC-1234', minLength: 7, maxLength: 8 })
  @IsString()
  @Length(7, 8)
  placa: string;

  @ApiProperty({ example: '9BWZZZ377VT004251', minLength: 17, maxLength: 17 })
  @IsString()
  @Length(17, 17)
  chassi: string;

  @ApiProperty({ example: '12345678901', minLength: 9, maxLength: 11 })
  @IsString()
  @Length(9, 11)
  renavam: string;

  @ApiProperty({ example: 'Volkswagen' })
  @IsString()
  marca: string;

  @ApiProperty({ example: 'Gol' })
  @IsString()
  modelo: string;

  @ApiProperty({
    example: 2024,
    minimum: 1900,
    maximum: new Date().getFullYear() + 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  ano: number;
}
