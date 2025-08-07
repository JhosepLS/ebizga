import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CicloService } from '../../../services/ciclo.service';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { AuthService } from '../../../services/auth.service';
import { CicloEvaluacion } from '../../../models/ciclo-evaluacion.model';
import { Evaluacion } from '../../../models/evaluacion.model';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-lista-ciclos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-ciclos.component.html'
})
export class ListaCiclosComponent implements OnInit {
  ciclos: CicloEvaluacion[] = [];
  evaluaciones: Evaluacion[] = [];
  currentUser: Usuario | null = null;
  cicloSeleccionado: CicloEvaluacion | null = null;

  constructor(
    private cicloService: CicloService,
    private evaluacionService: EvaluacionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.cargarCiclos();
    this.cargarEvaluaciones();
  }

  cargarCiclos() {
    this.cicloService.obtenerCiclos().subscribe({
      next: (response) => {
        this.ciclos = response.data;
      },
      error: (error) => {
        console.error('Error al cargar ciclos:', error);
        Swal.fire('Error', 'No se pudieron cargar los ciclos', 'error');
      }
    });
  }

  cargarEvaluaciones() {
    this.evaluacionService.obtenerEvaluaciones().subscribe({
      next: (response) => {
        this.evaluaciones = response.data;
      },
      error: (error) => {
        console.error('Error al cargar evaluaciones:', error);
      }
    });
  }

  contarEvaluaciones(cicloId: number): number {
    return this.evaluaciones.filter(e => e.ciclo.id === cicloId).length;
  }

  contarEvaluacionesPorEstado(cicloId: number, estado: string): number {
    return this.evaluaciones.filter(e => e.ciclo.id === cicloId && e.estado === estado).length;
  }

  verDetalle(ciclo: CicloEvaluacion) {
    this.cicloSeleccionado = ciclo;
    const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
    modal.show();
  }

  desactivar(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción desactivará el ciclo de evaluación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cicloService.desactivarCiclo(id).subscribe({
          next: () => {
            Swal.fire('Desactivado', 'El ciclo ha sido desactivado', 'success');
            this.cargarCiclos();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo desactivar el ciclo', 'error');
          }
        });
      }
    });
  }
}