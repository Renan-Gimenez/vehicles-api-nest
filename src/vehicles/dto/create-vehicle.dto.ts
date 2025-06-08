import { Type } from 'class-transformer';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @Length(7, 8)
  placa: string;

  @IsString()
  @Length(17, 17)
  chassi: string;

  @IsString()
  @Length(9, 11)
  renavam: string;

  @IsString()
  marca: string;

  @IsString()
  modelo: string;

  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  ano: number;
}
