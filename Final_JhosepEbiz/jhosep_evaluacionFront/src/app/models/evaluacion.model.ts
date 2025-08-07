import { Usuario } from './usuario.model';
import { CicloEvaluacion } from './ciclo-evaluacion.model';

export interface Evaluacion {
  id: number;
  ciclo: CicloEvaluacion;
  evaluado: Usuario;
  evaluador: Usuario;
  tipo: 'METAS' | 'COMPETENCIAS' | 'MIXTA';
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA' | 'FIRMADA';
  puntuacionFinal?: number;
  retroalimentacion?: string;
  fechaCreacion: string;
  fechaCompletada?: string;
  fechaFirmada?: string;
  firmaImagen?: string;
}