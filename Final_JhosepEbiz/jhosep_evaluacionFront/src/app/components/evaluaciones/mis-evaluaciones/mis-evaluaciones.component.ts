import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { Evaluacion } from '../../../models/evaluacion.model';
import { EstadoEvaluacionPipe } from '../../../pipes/estado-evaluacion.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-mis-evaluaciones',
  standalone: true,
  imports: [CommonModule, DatePipe, EstadoEvaluacionPipe],
  templateUrl: './mis-evaluaciones.component.html'
})

export class MisEvaluacionesComponent implements OnInit {
  misEvaluaciones: Evaluacion[] = [];
  currentUser: Usuario | null = null;
  evaluacionSeleccionada: Evaluacion | null = null;

  constructor(
    private evaluacionService: EvaluacionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.cargarMisEvaluaciones();
  }

  cargarMisEvaluaciones() {
    this.evaluacionService.obtenerMisEvaluaciones().subscribe({
      next: (response) => {
        this.misEvaluaciones = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  contarPorEstado(estado: string): number {
    return this.misEvaluaciones.filter(e => e.estado === estado).length;
  }

  calcularPromedio(): string {
    const evaluacionesConPuntuacion = this.misEvaluaciones.filter(e => e.puntuacionFinal);
    if (evaluacionesConPuntuacion.length === 0) return 'N/A';
    
    const suma = evaluacionesConPuntuacion.reduce((acc, e) => acc + (e.puntuacionFinal || 0), 0);
    return (suma / evaluacionesConPuntuacion.length).toFixed(1);
  }

  esEvaluador(evaluacion: Evaluacion): boolean {
    return this.currentUser?.id === evaluacion.evaluador.id;
  }

  verDetalleEvaluacion(evaluacion: Evaluacion) {
    this.evaluacionSeleccionada = evaluacion;
    const modal = new bootstrap.Modal(document.getElementById('detalleEvaluacionModal')!);
    modal.show();
  }
}