import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/users/login';
  }
  // Función para realizar la autenticación mediante una petición POST
  login(obj: any) {
    return this.http.post(this.myAppUrl + this.myApiUrl, obj);
  }
  // Función para verificar si el usuario ha iniciado sesión
  IsLoggedIn() {
    return sessionStorage.getItem('token') != null;
  }
}
