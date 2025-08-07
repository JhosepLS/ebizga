import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { CicloEvaluacion } from '../models/ciclo-evaluacion.model';

@Injectable({
  providedIn: 'root'
})
export class CicloService {
  private baseUrl = 'http://localhost:8080/api/ciclos';

  constructor(private http: HttpClient) {}

  obtenerCiclos(): Observable<ApiResponse<CicloEvaluacion[]>> {
    return this.http.get<ApiResponse<CicloEvaluacion[]>>(this.baseUrl);
  }

  obtenerCiclosActivos(): Observable<ApiResponse<CicloEvaluacion[]>> {
    return this.http.get<ApiResponse<CicloEvaluacion[]>>(`${this.baseUrl}/activos`);
  }

  obtenerCiclo(id: number): Observable<ApiResponse<CicloEvaluacion>> {
    return this.http.get<ApiResponse<CicloEvaluacion>>(`${this.baseUrl}/${id}`);
  }

  crearCiclo(ciclo: any): Observable<ApiResponse<CicloEvaluacion>> {
    return this.http.post<ApiResponse<CicloEvaluacion>>(this.baseUrl, ciclo);
  }

  actualizarCiclo(id: number, ciclo: any): Observable<ApiResponse<CicloEvaluacion>> {
    return this.http.put<ApiResponse<CicloEvaluacion>>(`${this.baseUrl}/${id}`, ciclo);
  }

  desactivarCiclo(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }
}