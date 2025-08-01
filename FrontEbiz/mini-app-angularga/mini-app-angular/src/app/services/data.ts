import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>('/data/usuarios.json');  // <- Cambiar aquí
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>('/data/productos.json');  // <- Cambiar aquí
  }
}