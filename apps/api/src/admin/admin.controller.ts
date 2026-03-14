import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpsertEntityDto } from './admin.dto';
import { AdminService } from './admin.service';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get(':entity')
  list(@Param('entity') entity: 'invitados' | 'categorias' | 'eventos' | 'registrados') {
    return this.service.list(entity);
  }

  @Get(':entity/:id')
  get(
    @Param('entity') entity: 'invitados' | 'categorias' | 'eventos' | 'registrados',
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.service.get(entity, id);
  }

  @Post(':entity')
  create(
    @Param('entity') entity: 'invitados' | 'categorias' | 'eventos' | 'registrados',
    @Body() dto: UpsertEntityDto
  ) {
    return this.service.create(entity, dto.data);
  }

  @Patch(':entity/:id')
  update(
    @Param('entity') entity: 'invitados' | 'categorias' | 'eventos' | 'registrados',
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpsertEntityDto
  ) {
    return this.service.update(entity, id, dto.data);
  }

  @Delete(':entity/:id')
  remove(
    @Param('entity') entity: 'invitados' | 'categorias' | 'eventos' | 'registrados',
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.service.remove(entity, id);
  }
}
