import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../service/reserva.service';
import { UsuarioService } from '../service/usuario.service';
import { LibroService } from '../service/libro.service';
import { Usuario } from '../models/usuario';
import { Libro } from '../models/libro';
import { ApiResponse } from '../models/api-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-reserva.component.html'
  //styleUrl: './crear-reserva.component.css'
})
export class CrearReservaComponent implements OnInit {

  public formReserva: FormGroup;
  public usuarios: Usuario[] = [];
  public librosDisponibles: Libro[] = [];
  public cargando: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly reservaService: ReservaService,
    private readonly usuarioService: UsuarioService,
    private readonly libroService: LibroService,
    private readonly route: ActivatedRoute
  ) {
    this.formReserva = this.fb.group({
      usuarioId: ['', Validators.required],
      libroId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarLibrosDisponibles();
    
    this.route.queryParams.subscribe(params => {
      if (params['libroId']) {
        this.formReserva.patchValue({ libroId: params['libroId'] });
      }
    });
  }

  private cargarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (response: ApiResponse<Usuario[]>) => {
        this.usuarios = response.data;
      },
      error: (error: any) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  private cargarLibrosDisponibles(): void {
    this.libroService.listarDisponibles().subscribe({
      next: (response: ApiResponse<Libro[]>) => {
        this.librosDisponibles = response.data;
      },
      error: (error: any) => {
        console.error('Error al cargar libros disponibles:', error);
      }
    });
  }

  crear(): void {
    if (!this.formReserva.valid) return;

    this.cargando = true;
    const { usuarioId, libroId } = this.formReserva.value;

    this.reservaService.crear(usuarioId, libroId).subscribe({
      next: (response: any) => {
        this.cargando = false;
        Swal.fire({
          icon: 'success',
          title: '¡Reserva Exitosa!',
          text: response.message,
          showConfirmButton: true
        });
        this.formReserva.reset();
        this.cargarLibrosDisponibles();
      },
      error: (error: any) => {
        this.cargando = false;
        const errorResponse = error.error as ApiResponse<any>;
        Swal.fire({
          icon: 'error',
          title: errorResponse.errorCode || 'Error',
          text: errorResponse.message || 'Error al crear reserva'
        });
      }
    });
  }

  get usuarioInvalido(): boolean {
    const campo = this.formReserva.get('usuarioId');
    return !!(campo?.invalid && campo?.touched);
  }

  get libroInvalido(): boolean {
    const campo = this.formReserva.get('libroId');
    return !!(campo?.invalid && campo?.touched);
  }
}