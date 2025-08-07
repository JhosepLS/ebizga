export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: 'ADMIN' | 'EVALUADOR' | 'EMPLEADO';
  cargo: string;
  fechaCreacion: string;
}