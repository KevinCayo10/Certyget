import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InstructoresService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/instructor';
  }
  loadInstructores(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrl}`
    );
  }
  addInstructor(
    formData: FormData
  ): Observable<{ success: number; data: any }> {
    return this.http.post<{ success: number; data: any }>(
      `${this.myAppUrl}${this.myApiUrl}`,
      formData
    );
  }
  // Actualizar instructores
  updateInstructor(id: number, instructor: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, instructor);
  }
  /* Elimina los instructores */

  deleteInstructor(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
}
