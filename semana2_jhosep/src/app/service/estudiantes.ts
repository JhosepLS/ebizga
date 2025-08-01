import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  
  url = "http://localhost:8080/api/estudiantes"

  constructor (private readonly http:HttpClient) { }

  guardarEstudiantes(body:any): Observable<any> {

    return this.http.post(this.url, body);
  }

  obtenerEstudiantes(): Observable<any>{
    return this.http.get(this.url)
  }

  editarEstudiantes(body:any, id:any): Observable<any>{
    return this.http.put(this.url + '/' + id, body)
  }
}
