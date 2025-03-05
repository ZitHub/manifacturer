import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Address, Contact, Shop } from '../types';

export type ManifacturerDocument = HydratedDocument<Manifacturer>;

@Schema()
export class Manifacturer {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  company: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  address: Address;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  contact: Contact;

  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
  shops: Shop[];

  @Prop({ required: false })
  sparesUrl: string;

  @Prop({ required: true, default: false })
  heat: boolean;

  @Prop({ required: true, default: false })
  water: boolean;

  @Prop({ required: true, default: false })
  zvshk: boolean;

  @Prop({ required: true })
  weee: string;
}

export const ManifacturerSchema = SchemaFactory.createForClass(Manifacturer);
