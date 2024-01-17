import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InstructoresService {
  // Variables privadas para almacenar la URL de la aplicación y la URL de la API de instructores
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/instructor';
  }
  // Función para cargar la lista de instructores desde la API
  loadInstructores(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrl}`
    );
  }
  // Función para agregar un nuevo instructor mediante una petición POST
  addInstructor(
    formData: FormData
  ): Observable<{ success: number; data: any }> {
    return this.http.post<{ success: number; data: any }>(
      `${this.myAppUrl}${this.myApiUrl}`,
      formData
    );
  }
  // Función para actualizar la información de un instructor mediante una petición PUT
  updateInstructor(id: number, instructor: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, instructor);
  }
  // Función para eliminar un instructor mediante una petición DELETE
  deleteInstructor(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
}
