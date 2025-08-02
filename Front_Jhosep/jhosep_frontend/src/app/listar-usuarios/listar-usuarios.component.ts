import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import { ApiResponse } from '../models/api-response';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5>Lista de Usuarios</h5>
          </div>
          <div class="card-body">
            <table class="table" *ngIf="usuarios.length > 0; else noUsuarios">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let usuario of usuarios">
                  <td>{{usuario.id}}</td>
                  <td>{{usuario.nombre}}</td>
                  <td>{{usuario.correo}}</td>
                </tr>
              </tbody>
            </table>
            <ng-template #noUsuarios>
              <p class="text-muted">No hay usuarios registrados</p>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  //styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];

  constructor(private readonly usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();
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
}