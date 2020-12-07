export class Roles {
  editor: boolean;
}


export class Usuarios {
  uid: string;
  email: string;
  emailVerified?: boolean;
  displayName?: string;
  password?: string;
  roles?: Roles;
}


export class Subscripciones {
  nombreSubs: string;
  tipoSubs: string;
  precioSubs: string;
  vencimientoSubs: string;
}
