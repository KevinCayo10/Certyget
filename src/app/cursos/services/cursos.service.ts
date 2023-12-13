import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Instructores } from '../models/instructores.models';
import { Cursos } from '../models/cursos.models';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private myAppUrl: string;
  private myApiUrlCursos: string;
  private myApiUrlInstructor: string;
  private myApiUrlCategory: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrlInstructor = '/api/instructor/';
    this.myApiUrlCursos = '/api/cursos/';
    this.myApiUrlCategory = '/api/category/';
  }

  loadInstructors(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlInstructor}`
    );
  }
  loadCategorys(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCategory}`
    );
  }

  // loadCursos(): Observable<Cursos[]> {
  //   return this.http.get<Cursos[]>(`${this.myAppUrl}${this.myApiUrlCursos}`);
  // }
  loadCursos(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCursos}`
    );
  }

  addCursos(formData: FormData): Observable<{ success: number; data: any }> {
    return this.http.post<{ success: number; data: any }>(
      `${this.myAppUrl}${this.myApiUrlCursos}`,
      formData
    );
  }
}
