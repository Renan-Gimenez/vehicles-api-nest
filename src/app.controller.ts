import { ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    example: 'OK',
  })
  @Get('health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
