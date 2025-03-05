export type Address = {
  street: string;
  plz: string;
  city: string;
  country: string;
  iso: string;
};

export type Contact = {
  phone: string;
  serviceUrl: string;
  email: string;
};

export type Shop = {
  id: string;
  categoryUrl: string;
  categoryId: string;
  name?: string;
  ebayName?: string;
};

type Manifacturer = {
  key: string;
  name: string;
  company: string;
  address: Address;
  Contact: Contact;
  shops: Shop[];
  sparesUrl?: string;
  heat: boolean;
  water: boolean;
  zvshk: boolean;
  weee: string;
};
