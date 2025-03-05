import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManifacturerDto } from './dtos/create-manifacturer.dto';
import { UpdateManifacturerDto } from './dtos/update-manifacturer.dto';
import { Manifacturer } from './schemas/manifacturer.schema';

@Injectable()
export class ManifacturerService {
  constructor(
    @InjectModel(Manifacturer.name)
    private readonly manifacturerModel: Model<Manifacturer>,
  ) {}

  async create(
    createManifacturerDto: CreateManifacturerDto,
  ): Promise<Manifacturer> {
    const createdManifacturer = await this.manifacturerModel.create(
      createManifacturerDto,
    );
    return createdManifacturer;
  }

  async findAll(): Promise<Manifacturer[]> {
    return this.manifacturerModel.find().exec();
  }

  async findOne(id: string): Promise<Manifacturer | null> {
    return this.manifacturerModel.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateManifacturerDto: UpdateManifacturerDto,
  ): Promise<Manifacturer | null> {
    return this.manifacturerModel
      .findByIdAndUpdate({ _id: id }, updateManifacturerDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Manifacturer | null> {
    const deletedManifacturer = await this.manifacturerModel
      .findByIdAndDelete({ _id: id })
      .exec();

    return deletedManifacturer;
  }
}
