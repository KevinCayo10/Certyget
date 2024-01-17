// Clase TypeScript llamada User para representar objetos que contienen información de usuarios
export class User {
  id_usu: string;
  user_usu: string;
  pass_usu: string;
  rol_usu: string;

  constructor(
    id_usu: string,
    user_usu: string,
    pass_usu: string,
    rol_usu: string
  ) {
    (this.id_usu = id_usu),
      (this.user_usu = user_usu),
      (this.pass_usu = pass_usu),
      (this.rol_usu = rol_usu);
  }
}
