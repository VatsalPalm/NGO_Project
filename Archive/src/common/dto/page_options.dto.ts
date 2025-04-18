import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Pagination } from '../constants/app.pagination';

export class PageOptionsDto {
  @ApiPropertyOptional({
    description: 'Pagination',
    enum: Pagination,
    default: Pagination.YES,
  })
  @IsEnum(Pagination)
  @IsOptional()
  readonly pagination: Pagination;

  @ApiPropertyOptional({
    description: 'Page number',
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number;

  @ApiPropertyOptional({
    description: 'Record limit',
    minimum: 1,
    maximum: 500,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(500)
  @IsOptional()
  readonly limit: number;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  @ApiPropertyOptional({ description: 'Search query' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly q?: string;
}
