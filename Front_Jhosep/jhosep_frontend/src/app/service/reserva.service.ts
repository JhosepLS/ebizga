import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  
  private url = 'http://localhost:8080/api/reservas';

  constructor(private readonly http: HttpClient) { }

  crear(usuarioId: number, libroId: number): Observable<ApiResponse<Reserva>> {
    const body = { usuarioId, libroId };
    return this.http.post<ApiResponse<Reserva>>(this.url, body);
  }

  obtenerPorUsuario(usuarioId: number): Observable<ApiResponse<Reserva[]>> {
    return this.http.get<ApiResponse<Reserva[]>>(`${this.url}/usuario/${usuarioId}`);
  }
}