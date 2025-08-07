import { Usuario } from './usuario.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  rol: 'ADMIN' | 'EVALUADOR' | 'EMPLEADO';
  cargo: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}