import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Patch } from '@nestjs/common';
import { BaseService } from './base.service';

export class BaseController<T> {
  constructor(protected readonly baseService: BaseService) {}

  @Post()
  async create(@Body() createDto: any): Promise<T> {
    return this.baseService.create(createDto);
  }

  @Get()
  async findAll(): Promise<T[]> {
    return this.baseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.baseService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: any,
  ): Promise<T> {
    return this.baseService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.baseService.remove(id);
  }
}