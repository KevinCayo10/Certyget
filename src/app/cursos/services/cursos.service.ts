import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private myAppUrl: string;
  private myApiUrlCursos: string;
  private myApiUrlInstructor: string;
  private myApiUrlCategory: string;

  constructor(private http: HttpClient) {
    // Configuración de las URL de la API basadas en el entorno
    this.myAppUrl = environment.endpoint;
    this.myApiUrlInstructor = '/api/instructor/';
    this.myApiUrlCursos = '/api/cursos/';
    this.myApiUrlCategory = '/api/category/';
  }
  // Método para cargar instructores desde la API
  loadInstructors(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlInstructor}`
    );
  }
  // Método para cargar categorías desde la API
  loadCategorys(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCategory}`
    );
  }
  // Método para cargar cursos desde la API
  loadCursos(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCursos}`
    );
  }
  // Método para agregar cursos enviando datos mediante POST
  addCursos(formData: FormData): Observable<{ success: number; data: any }> {
    return this.http.post<{ success: number; data: any }>(
      `${this.myAppUrl}${this.myApiUrlCursos}`,
      formData
    );
  }
  // Método para actualizar cursos enviando datos mediante PUT
  updateCurso(id: number, curso: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrlCursos}${id}`, curso);
  }
  // Método para eliminar cursos enviando una solicitud DELETE
  deleteCurso(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrlCursos}${id}`);
  }
}
