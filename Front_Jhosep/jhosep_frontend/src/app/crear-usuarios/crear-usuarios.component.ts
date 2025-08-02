import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../models/usuario';
import { ApiResponse } from '../models/api-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-usuarios.component.html'
  //styleUrl: './crear-usuarios.component.css'
})
export class CrearUsuariosComponent implements OnInit {

  public formUsuario: FormGroup;
  public usuarios: Usuario[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService
  ) {
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  crear(): void {
    if (!this.formUsuario.valid) return;

    this.usuarioService.crear(this.formUsuario.getRawValue()).subscribe({
      next: (response: ApiResponse<Usuario>) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message
        });
        this.formUsuario.reset();
        this.listarUsuarios();
      },
      error: (error: any) => {
        const errorResponse = error.error as ApiResponse<any>;
        Swal.fire({
          icon: 'error',
          title: errorResponse.errorCode || 'Error',
          text: errorResponse.message || 'Error al crear usuario'
        });
      }
    });
  }

  private listarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (response: ApiResponse<Usuario[]>) => {
        this.usuarios = response.data;
      },
      error: (error: any) => {
        console.error('Error al listar usuarios:', error);
      }
    });
  }

  get nombreInvalido(): boolean {
    const campo = this.formUsuario.get('nombre');
    return !!(campo?.invalid && campo?.touched);
  }

  get correoInvalido(): boolean {
    const campo = this.formUsuario.get('correo');
    return !!(campo?.invalid && campo?.touched);
  }
}