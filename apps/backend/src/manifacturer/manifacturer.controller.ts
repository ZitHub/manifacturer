import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ManifacturerService } from './manifacturer.service';
import { CreateManifacturerDto } from './dtos/create-manifacturer.dto';
import { UpdateManifacturerDto } from './dtos/update-manifacturer.dto';
import { Manifacturer } from './schemas/manifacturer.schema';

@Controller('manifacturer')
export class ManifacturerController {
  constructor(private readonly manifacturerService: ManifacturerService) {}

  @Post()
  async create(
    @Body() createManifacturerDto: CreateManifacturerDto,
  ): Promise<Manifacturer> {
    return this.manifacturerService.create(createManifacturerDto);
  }

  @Get()
  async findAll(): Promise<Manifacturer[]> {
    return this.manifacturerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Manifacturer | null> {
    return this.manifacturerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateManifacturerDto: UpdateManifacturerDto,
  ): Promise<Manifacturer | null> {
    return this.manifacturerService.update(id, updateManifacturerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Manifacturer | null> {
    return this.manifacturerService.delete(id);
  }
}
