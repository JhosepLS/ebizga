import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CicloService } from '../../../services/ciclo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-ciclo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './crear-ciclo.component.html'
})
export class CrearCicloComponent implements OnInit {
  cicloForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private cicloService: CicloService,
    private router: Router
  ) {
    this.cicloForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]]
    }, { validators: this.fechaValidator });
  }

  ngOnInit() {
    // Establecer fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
    this.cicloForm.get('fechaInicio')?.setValue(today);
  }

  fechaValidator(group: FormGroup) {
    const fechaInicio = group.get('fechaInicio')?.value;
    const fechaFin = group.get('fechaFin')?.value;
    
    if (fechaInicio && fechaFin && new Date(fechaFin) <= new Date(fechaInicio)) {
      return { fechaInvalida: true };
    }
    return null;
  }

  onSubmit() {
    if (this.cicloForm.valid) {
      this.loading = true;
      
      this.cicloService.crearCiclo(this.cicloForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: response.message
          });
          this.router.navigate(['/ciclos']);
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'Error al crear ciclo'
          });
        }
      });
    }
  }
}