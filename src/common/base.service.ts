import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class BaseService {
  constructor(protected repository: Repository<any>) {}

  
  async create(data: any): Promise<any> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

 
  async findAll(): Promise<any[]> {
    return await this.repository.find();
  }

  
  async findOne(id: number): Promise<any> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  
  async update(id: number, data: any): Promise<any> {
  const entity = await this.repository.preload({
    id,
    ...data,
  });

  if (!entity) {
    throw new NotFoundException(`Entity with ID ${id} not found`);
  }

  return await this.repository.save(entity);
}
  
  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
