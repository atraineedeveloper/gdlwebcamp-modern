import { IsObject } from 'class-validator';

export class UpsertEntityDto {
  @IsObject()
  data!: Record<string, unknown>;
}
