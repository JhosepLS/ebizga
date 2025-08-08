import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { Evaluacion } from '../models/evaluacion.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private baseUrl = 'http://localhost:8080/api/evaluaciones';

  constructor(private http: HttpClient) {}

  obtenerEvaluaciones(): Observable<ApiResponse<Evaluacion[]>> {
    return this.http.get<ApiResponse<Evaluacion[]>>(this.baseUrl);
  }

  obtenerEvaluacion(id: number): Observable<ApiResponse<Evaluacion>> {
    return this.http.get<ApiResponse<Evaluacion>>(`${this.baseUrl}/${id}`);
  }

  crearEvaluacion(evaluacion: any): Observable<ApiResponse<Evaluacion>> {
    return this.http.post<ApiResponse<Evaluacion>>(this.baseUrl, evaluacion);
  }

  completarEvaluacion(id: number, data: any): Observable<ApiResponse<Evaluacion>> {
    return this.http.put<ApiResponse<Evaluacion>>(`${this.baseUrl}/${id}/completar`, data);
  }

  firmarEvaluacion(id: number, firmaImagen: string): Observable<ApiResponse<Evaluacion>> {
    return this.http.put<ApiResponse<Evaluacion>>(`${this.baseUrl}/${id}/firmar`, { firmaImagen });
  }

  eliminarEvaluacion(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  obtenerEvaluacionesPorUsuario(usuarioId: number): Observable<ApiResponse<Evaluacion[]>> {
  return this.http.get<ApiResponse<Evaluacion[]>>(`${this.baseUrl}/usuario/${usuarioId}`);
}

  obtenerMisEvaluaciones(): Observable<ApiResponse<Evaluacion[]>> {
    return this.http.get<ApiResponse<Evaluacion[]>>(`${this.baseUrl}/mis-evaluaciones`);
  }

  filtrarEvaluaciones(filtros: any): Observable<ApiResponse<Evaluacion[]>> {
    let params = new HttpParams();
    if (filtros.estado) params = params.set('estado', filtros.estado);
    if (filtros.cicloId) params = params.set('cicloId', filtros.cicloId.toString());
    if (filtros.evaluadorId) params = params.set('evaluadorId', filtros.evaluadorId.toString());
    if (filtros.evaluadoId) params = params.set('evaluadoId', filtros.evaluadoId.toString());
    
    return this.http.get<ApiResponse<Evaluacion[]>>(`${this.baseUrl}/filtrar`, { params });
  }
}