import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulasService {
  
  url = "http://localhost:8080/api/estudiantes/aulas"

  constructor (private readonly http:HttpClient) { }

  guardarAulas(body:any): Observable<any> {

    return this.http.post(this.url, body);
  }

  obtenerAulas(): Observable<any>{
    return this.http.get(this.url)
  }

}
