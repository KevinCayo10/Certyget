import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private baseUrl = 'http://localhost:4000/api/category';

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategorias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  // Obtener una categoría por su id
  getCategoriaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Crear una nueva categoría
  createCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, categoria);
  }

  // Actualizar una categoría
  updateCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, categoria);
  }

  // Eliminar una categoría
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
