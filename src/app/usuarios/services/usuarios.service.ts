import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/users/';
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}login`, credentials);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/${userId}`);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.myAppUrl}${this.myApiUrl}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${userId}`);
  }
}
