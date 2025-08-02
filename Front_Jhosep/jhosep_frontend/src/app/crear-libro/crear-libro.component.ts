import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../service/libro.service';
import { Libro } from '../models/libro';
import { ApiResponse } from '../models/api-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-libro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-libro.component.html'
  //styleUrl: './crear-libro.component.css'
})
export class CrearLibroComponent implements OnInit {

  public formLibro: FormGroup;
  public libros: Libro[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly libroService: LibroService
  ) {
    this.formLibro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      codigo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      autor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      stock: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    this.listarLibros();
  }

  crear(): void {
    if (!this.formLibro.valid) return;

    this.libroService.crear(this.formLibro.getRawValue()).subscribe({
      next: (response: ApiResponse<Libro>) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message
        });
        this.formLibro.reset();
        this.listarLibros();
      },
      error: (error: any) => {
        const errorResponse = error.error as ApiResponse<any>;
        Swal.fire({
          icon: 'error',
          title: errorResponse.errorCode || 'Error',
          text: errorResponse.message || 'Error al crear libro'
        });
      }
    });
  }

  private listarLibros(): void {
    this.libroService.listar().subscribe({
      next: (response: ApiResponse<Libro[]>) => {
        this.libros = response.data;
      },
      error: (error: any) => {
        console.error('Error al listar libros:', error);
      }
    });
  }

  get tituloInvalido(): boolean {
    const campo = this.formLibro.get('titulo');
    return !!(campo?.invalid && campo?.touched);
  }

  get codigoInvalido(): boolean {
    const campo = this.formLibro.get('codigo');
    return !!(campo?.invalid && campo?.touched);
  }

  get autorInvalido(): boolean {
    const campo = this.formLibro.get('autor');
    return !!(campo?.invalid && campo?.touched);
  }

  get stockInvalido(): boolean {
    const campo = this.formLibro.get('stock');
    return !!(campo?.invalid && campo?.touched);
  }
}