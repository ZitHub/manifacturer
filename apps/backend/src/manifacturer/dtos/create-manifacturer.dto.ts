import { Address, Contact, Shop } from '../types';

export class CreateManifacturerDto {
  readonly key: string;
  readonly name: string;
  readonly company: string;
  readonly address: Address;
  readonly contact: Contact;
  readonly shops: Shop[];
  readonly sparesUrl?: string;
  readonly heat: boolean;
  readonly water: boolean;
  readonly zvshk: boolean;
  readonly weee: string;
}
