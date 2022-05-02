export class User {
  id!: number;
  username!: string;
  firstname!: string;
  lastname!: string;
  pronouns!: number;
}

export class Contact {
  id!: number;
  firstname!: string;
  lastname!: string;
  information!: string;
}

export class Appointment {
  id!: number;
  date!: string;
  contact!: Contact;
  information!: string;
  address!: string;
}

export class Medecine {
  id!: number;
  name!: string;
  dose!: number;
  unit!: string;
}

export class Prescription {
  id!: number;
  expire!: string;
  information!: string;
  medecines!: Medecine[];
}
