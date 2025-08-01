import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<boolean> {
    return this.http.get<any[]>('/data/credenciales.json').pipe( 
      map(credenciales => {
        const user = credenciales.find(c => c.usuario === usuario && c.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify({ usuario: user.usuario }));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}