export interface ClienteUsuario {
  idCliente: number;
  dni: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  contrasenya: string;
  fechaRegistro: Date;
  idPerfil: number;
}
