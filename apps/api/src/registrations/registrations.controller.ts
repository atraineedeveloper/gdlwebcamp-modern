import { Body, Controller, Post } from '@nestjs/common';
import { CreateRegistrationDto } from './dto';
import { RegistrationsService } from './registrations.service';

@Controller('public')
export class RegistrationsController {
  constructor(private readonly service: RegistrationsService) {}

  @Post('registro')
  create(@Body() dto: CreateRegistrationDto) {
    return this.service.create(dto);
  }
}
