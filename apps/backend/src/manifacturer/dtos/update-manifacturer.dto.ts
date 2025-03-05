import { PartialType } from '@nestjs/mapped-types';
import { CreateManifacturerDto } from './create-manifacturer.dto';

export class UpdateManifacturerDto extends PartialType(CreateManifacturerDto) {}
