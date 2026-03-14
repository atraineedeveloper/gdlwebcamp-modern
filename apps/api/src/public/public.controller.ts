import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly service: PublicService) {}

  @Get('home-summary')
  homeSummary() {
    return this.service.homeSummary();
  }

  @Get('invitados')
  invitados() {
    return this.service.invitados();
  }

  @Get('eventos')
  eventos() {
    return this.service.eventos();
  }

  @Get('calendario')
  calendario() {
    return this.service.calendario();
  }
}
