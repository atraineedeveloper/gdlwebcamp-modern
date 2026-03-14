import { IsArray, IsEmail, IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  nombre_registrado!: string;

  @IsString()
  apellido_registrado!: string;

  @IsEmail()
  email_registrado!: string;

  @IsObject()
  pases_articulos!: Record<string, unknown>;

  @IsArray()
  talleres_registrados!: unknown[];

  @IsNumber()
  regalo!: number;

  @IsNumber()
  @Min(0)
  total_pagado!: number;

  @IsOptional()
  @IsNumber()
  pagado?: number;
}
