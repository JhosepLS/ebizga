import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { Evaluacion } from '../../../models/evaluacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-completar-evaluacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './completar-evaluacion.component.html'
})
export class CompletarEvaluacionComponent implements OnInit {
  evaluacionForm: FormGroup;
  evaluacion: Evaluacion | null = null;
  loading = false;
  evaluacionId: number = 0;
  
  valorMeta1 = 0;
  valorMeta2 = 0;
  puntuacionFinal = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private evaluacionService: EvaluacionService
  ) {
    this.evaluacionForm = this.fb.group({
      meta1: [0],
      meta2: [0],
      competencia1: ['', Validators.required],
      competencia2: ['', Validators.required],
      competencia3: ['', Validators.required],
      retroalimentacion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.evaluacionId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEvaluacion();
    
    // Suscribirse a cambios para calcular puntuación
    this.evaluacionForm.valueChanges.subscribe(() => {
      this.calcularPuntuacion();
    });
  }

  cargarEvaluacion() {
    this.evaluacionService.obtenerEvaluacion(this.evaluacionId).subscribe({
      next: (response) => {
        this.evaluacion = response.data;
      },
      error: (error) => {
        console.error('Error al cargar evaluación:', error);
        Swal.fire('Error', 'No se pudo cargar la evaluación', 'error');
        this.router.navigate(['/evaluaciones']);
      }
    });
  }

  actualizarValorMeta(meta: number, event: any) {
    const valor = Number(event.target.value);
    if (meta === 1) {
      this.valorMeta1 = valor;
    } else if (meta === 2) {
      this.valorMeta2 = valor;
    }
    this.calcularPuntuacion();
  }

  calcularPuntuacion() {
    const meta1 = this.valorMeta1;
    const meta2 = this.valorMeta2;
    const comp1 = Number(this.evaluacionForm.get('competencia1')?.value || 0);
    const comp2 = Number(this.evaluacionForm.get('competencia2')?.value || 0);
    const comp3 = Number(this.evaluacionForm.get('competencia3')?.value || 0);

    // Promedio de metas (50% del total)
    const promedioMetas = (meta1 + meta2) / 2;
    const puntuacionMetas = (promedioMetas * 50) / 100;

    // Promedio de competencias (50% del total)
    const promedioCompetencias = (comp1 + comp2 + comp3) / 3;
    const puntuacionCompetencias = ((promedioCompetencias * 20) * 50) / 100;

    this.puntuacionFinal = Math.round(puntuacionMetas + puntuacionCompetencias);
  }

  onSubmit() {
    if (this.evaluacionForm.valid) {
      this.loading = true;
      
      const data = {
        retroalimentacion: this.evaluacionForm.get('retroalimentacion')?.value,
        puntuacionFinal: this.puntuacionFinal
      };

      this.evaluacionService.completarEvaluacion(this.evaluacionId, data).subscribe({
        next: (response) => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Evaluación completada correctamente'
          });
          this.router.navigate(['/evaluaciones']);
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'Error al completar evaluación'
          });
        }
      });
    }
  }
}