import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private url = 'http://localhost:8080/api/usuarios';

  constructor(private readonly http: HttpClient) { }

  crear(usuario: Usuario): Observable<ApiResponse<Usuario>> {
    return this.http.post<ApiResponse<Usuario>>(this.url, usuario);
  }

  listar(): Observable<ApiResponse<Usuario[]>> {
    return this.http.get<ApiResponse<Usuario[]>>(this.url);
  }

  obtenerPorId(id: number): Observable<ApiResponse<Usuario>> {
    return this.http.get<ApiResponse<Usuario>>(`${this.url}/${id}`);
  }

  actualizar(id: number, usuario: Usuario): Observable<ApiResponse<Usuario>> {
    return this.http.put<ApiResponse<Usuario>>(`${this.url}/${id}`, usuario);
  }
}