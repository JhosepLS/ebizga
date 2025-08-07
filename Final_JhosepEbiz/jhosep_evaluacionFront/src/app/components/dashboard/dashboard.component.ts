import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EvaluacionService } from '../../services/evaluacion.service';
import { CicloService } from '../../services/ciclo.service';
import { Usuario } from '../../models/usuario.model';
import { Evaluacion } from '../../models/evaluacion.model';
import { EstadoEvaluacionPipe } from '../../pipes/estado-evaluacion.pipe';
import { RolUsuarioPipe } from '../../pipes/rol-usuario.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, EstadoEvaluacionPipe, RolUsuarioPipe],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  currentUser: Usuario | null = null;
  totalEvaluaciones = 0;
  evaluacionesCompletadas = 0;
  evaluacionesPendientes = 0;
  ciclosActivos = 0;
  evaluacionesRecientes: Evaluacion[] = [];

  constructor(
    private authService: AuthService,
    private evaluacionService: EvaluacionService,
    private cicloService: CicloService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.cargarDatos();
  }

  cargarDatos() {
    this.evaluacionService.obtenerEvaluaciones().subscribe({
      next: (response) => {
        const evaluaciones = response.data;
        this.totalEvaluaciones = evaluaciones.length;
        this.evaluacionesCompletadas = evaluaciones.filter((e: Evaluacion) => 
          e.estado === 'COMPLETADA' || e.estado === 'FIRMADA').length;
        this.evaluacionesPendientes = evaluaciones.filter((e: Evaluacion) => 
          e.estado === 'PENDIENTE').length;
        this.evaluacionesRecientes = evaluaciones.slice(0, 5);
      },
      error: (error) => console.error('Error al cargar evaluaciones:', error)
    });

    this.cicloService.obtenerCiclosActivos().subscribe({
      next: (response) => {
        this.ciclosActivos = response.data.length;
      },
      error: (error) => console.error('Error al cargar ciclos:', error)
    });
  }
}