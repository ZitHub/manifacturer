import { Module } from '@nestjs/common';
import { ManifacturerController } from './manifacturer.controller';
import { ManifacturerService } from './manifacturer.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Manifacturer,
  ManifacturerSchema,
} from './schemas/manifacturer.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: Manifacturer.name, schema: ManifacturerSchema },
    ]),
  ],
  controllers: [ManifacturerController],
  providers: [ManifacturerService],
})
export class ManifacturerModule {}
