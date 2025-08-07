import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}