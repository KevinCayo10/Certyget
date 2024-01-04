import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private myAppUrl: string;
  private myApiUrlCategory: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrlCategory = '/api/category';
  }

  // Obtener todas las categorías
  getCategorias(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlCategory}`);
  }

  // Obtener una categoría por su id
  getCategoriaById(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlCategory}/${id}`);
  }

  // Crear una nueva categoría
  createCategoria(categoria: any): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}${this.myApiUrlCategory}/`,
      categoria
    );
  }

  // Actualizar una categoría
  updateCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(
      `${this.myAppUrl}${this.myApiUrlCategory}/${id}`,
      categoria
    );
  }

  // Eliminar una categoría
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrlCategory}/${id}`);
  }
}
