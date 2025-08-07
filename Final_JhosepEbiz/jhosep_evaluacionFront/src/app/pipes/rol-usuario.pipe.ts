import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolUsuario',
  standalone: true
})
export class RolUsuarioPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'ADMIN':
        return 'Administrador';
      case 'EVALUADOR':
        return 'Evaluador';
      case 'EMPLEADO':
        return 'Empleado';
      default:
        return value;
    }
  }
}