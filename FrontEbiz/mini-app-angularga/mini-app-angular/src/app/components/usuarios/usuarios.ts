import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  filtroNombre: string = '';
  
  nuevoUsuario = {
    nombre: '',
    email: '',
    rol: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.dataService.getUsuarios().subscribe(
      data => {
        this.usuarios = data;
        this.usuariosFiltrados = [...this.usuarios];
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  filtrarUsuarios(): void {
    if (this.filtroNombre.trim() === '') {
      this.usuariosFiltrados = [...this.usuarios];
    } else {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }

  getRolClass(rol: string): string {
    switch (rol) {
      case 'Administrador':
        return 'table-danger';
      case 'Editor':
        return 'table-warning';
      case 'Usuario':
        return 'table-info';
      default:
        return '';
    }
  }

  agregarUsuario(): void {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.email && this.nuevoUsuario.rol) {
      const id = Math.max(...this.usuarios.map(u => u.id)) + 1;
      const usuario = {
        id: id,
        nombre: this.nuevoUsuario.nombre,
        email: this.nuevoUsuario.email,
        rol: this.nuevoUsuario.rol
      };
      
      this.usuarios.push(usuario);
      this.filtrarUsuarios();
      this.resetForm();
    }
  }

  resetForm(): void {
    this.nuevoUsuario = {
      nombre: '',
      email: '',
      rol: ''
    };
  }
}