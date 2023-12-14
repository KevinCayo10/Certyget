import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private myAppUrl: string;
  private myApiUrlUser: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrlUser = '/api/users/';
  }

  loadUser(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlUser}`
    );
  }
  addUsers(formData: FormData): Observable<{ success: number; data: any }> {
    return this.http.post<{ success: number; data: any }>(
      `${this.myAppUrl}${this.myApiUrlUser}`,
      formData
    );
  }
  deleteUsers(id_usu: string): Observable<{ success: number; data: any }> {
    return this.http.delete<{ success: number; data: any }>(
      `${this.myAppUrl}${this.myApiUrlUser}/${id_usu}`
    );
  }

  updateUsers(
    id_usu: string,
    formData: FormData
  ): Observable<{ success: number; data: any }> {
    return this.http.put<{ success: number; data: any }>(
      `${this.myAppUrl}${this.myApiUrlUser}/${id_usu}`,
      formData
    );
  }
}
