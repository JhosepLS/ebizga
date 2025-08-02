import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../models/libro';
import { LibroService } from '../service/libro.service';
import { ApiResponse } from '../models/api-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-libros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar-libros.component.html'
  //styleUrl: './listar-libros.component.css'
})
export class ListarLibrosComponent implements OnInit {

  public libros: Libro[] = [];
  public librosFiltrados: Libro[] = [];
  public filtroTitulo: string = '';

  constructor(private readonly libroService: LibroService) {}

  ngOnInit(): void {
    this.listarLibros();
  }

  private listarLibros(): void {
    this.libroService.listar().subscribe({
      next: (response: ApiResponse<Libro[]>) => {
        this.libros = response.data;
        this.librosFiltrados = [...this.libros];
      },
      error: (error: any) => {
        console.error('Error al listar libros:', error);
      }
    });
  }

  filtrarLibros(): void {
    this.librosFiltrados = this.libros.filter(libro => {
      return libro.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase()) ||
             libro.autor.toLowerCase().includes(this.filtroTitulo.toLowerCase());
    });
  }
}