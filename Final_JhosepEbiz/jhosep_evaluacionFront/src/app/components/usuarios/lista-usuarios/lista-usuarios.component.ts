import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { Evaluacion } from '../../../models/evaluacion.model';
import { RolUsuarioPipe } from '../../../pipes/rol-usuario.pipe';
import { EstadoEvaluacionPipe } from '../../../pipes/estado-evaluacion.pipe';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RolUsuarioPipe, EstadoEvaluacionPipe],
  templateUrl: './lista-usuarios.component.html'
})

export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  evaluaciones: Evaluacion[] = [];
  currentUser: Usuario | null = null;
  usuarioSeleccionado: Usuario | null = null;
  evaluacionesUsuario: Evaluacion[] = [];
  
  filtroRol: string = '';
  textoBusqueda: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private evaluacionService: EvaluacionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.cargarUsuarios();
    this.cargarEvaluaciones();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response.data;
        this.usuariosFiltrados = [...this.usuarios];
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
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

  aplicarFiltros() {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const cumpleFiltroRol = !this.filtroRol || usuario.rol === this.filtroRol;
      const cumpleBusqueda = !this.textoBusqueda || 
        usuario.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        usuario.email.toLowerCase().includes(this.textoBusqueda.toLowerCase());
      
      return cumpleFiltroRol && cumpleBusqueda;
    });
  }

  limpiarFiltros() {
    this.filtroRol = '';
    this.textoBusqueda = '';
    this.usuariosFiltrados = [...this.usuarios];
  }

  contarEvaluaciones(usuarioId: number): number {
    return this.evaluaciones.filter(e => 
      e.evaluado.id === usuarioId || e.evaluador.id === usuarioId
    ).length;
  }

  contarEvaluacionesRecibidas(usuarioId: number): number {
    return this.evaluaciones.filter(e => e.evaluado.id === usuarioId).length;
  }

  contarEvaluacionesRealizadas(usuarioId: number): number {
    return this.evaluaciones.filter(e => e.evaluador.id === usuarioId).length;
  }

  verDetalle(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    const modal = new bootstrap.Modal(document.getElementById('detalleUsuarioModal'));
    modal.show();
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
            this.cargarUsuarios();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
          }
        });
      }
    });
  }

  verEvaluacionesUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.cargarEvaluacionesUsuario(usuario.id);
    
    // Esperar un poco antes de abrir el modal
    setTimeout(() => {
      const modalElement = document.getElementById('evaluacionesUsuarioModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal evaluacionesUsuarioModal no encontrado');
      }
    }, 100);
  }

  cargarEvaluacionesUsuario(usuarioId: number) {
    this.evaluacionService.obtenerEvaluacionesPorUsuario(usuarioId).subscribe({
      next: (response) => {
        this.evaluacionesUsuario = response.data;
      }
    });
  }
}