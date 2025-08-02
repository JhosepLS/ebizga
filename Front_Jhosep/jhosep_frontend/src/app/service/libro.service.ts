import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  private url = 'http://localhost:8080/api/libros';

  constructor(private readonly http: HttpClient) { }

  crear(libro: Libro): Observable<ApiResponse<Libro>> {
    return this.http.post<ApiResponse<Libro>>(this.url, libro);
  }

  listar(): Observable<ApiResponse<Libro[]>> {
    return this.http.get<ApiResponse<Libro[]>>(this.url);
  }

  listarDisponibles(): Observable<ApiResponse<Libro[]>> {
    return this.http.get<ApiResponse<Libro[]>>(`${this.url}/disponibles`);
  }

  obtenerPorId(id: number): Observable<ApiResponse<Libro>> {
    return this.http.get<ApiResponse<Libro>>(`${this.url}/${id}`);
  }

  buscarPorTitulo(titulo: string): Observable<ApiResponse<Libro[]>> {
    return this.http.get<ApiResponse<Libro[]>>(`${this.url}/buscar?titulo=${titulo}`);
  }
}