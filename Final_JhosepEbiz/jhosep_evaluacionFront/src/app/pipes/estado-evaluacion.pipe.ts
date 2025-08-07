import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoEvaluacion',
  standalone: true
})
export class EstadoEvaluacionPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'PENDIENTE':
        return 'Pendiente';
      case 'EN_PROGRESO':
        return 'En Progreso';
      case 'COMPLETADA':
        return 'Completada';
      case 'FIRMADA':
        return 'Firmada';
      default:
        return value;
    }
  }
}