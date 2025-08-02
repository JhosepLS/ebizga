import { Usuario } from './usuario';
import { Libro } from './libro';

export interface Reserva {
  id?: number;
  usuario: Usuario;
  libro: Libro;
  fechaReserva: string;
}