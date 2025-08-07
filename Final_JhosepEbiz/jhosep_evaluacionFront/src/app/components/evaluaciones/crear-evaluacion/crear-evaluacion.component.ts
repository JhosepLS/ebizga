import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { CicloService } from '../../../services/ciclo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CicloEvaluacion } from '../../../models/ciclo-evaluacion.model';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-evaluacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './crear-evaluacion.component.html'
})
export class CrearEvaluacionComponent implements OnInit {
  evaluacionForm: FormGroup;
  ciclos: CicloEvaluacion[] = [];
  empleados: Usuario[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private evaluacionService: EvaluacionService,
    private cicloService: CicloService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.evaluacionForm = this.fb.group({
      cicloId: ['', [Validators.required]],
      evaluadoId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.cargarCiclos();
    this.cargarEmpleados();
  }

  cargarCiclos() {
    this.cicloService.obtenerCiclosActivos().subscribe({
      next: (response) => {
        this.ciclos = response.data;
      },
      error: (error) => {
        console.error('Error al cargar ciclos:', error);
      }
    });
  }

  cargarEmpleados() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (response) => {
        this.empleados = response.data.filter((u: Usuario) => 
          u.rol === 'EMPLEADO' || u.rol === 'EVALUADOR');
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      }
    });
  }

  onSubmit() {
    if (this.evaluacionForm.valid) {
      this.loading = true;
      
      this.evaluacionService.crearEvaluacion(this.evaluacionForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: response.message
          });
          this.router.navigate(['/evaluaciones']);
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'Error al crear evaluación'
          });
        }
      });
    }
  }
}