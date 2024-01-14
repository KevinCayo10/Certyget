import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private myAppUrl: string;
  private myApiUrlCategorias: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrlCategorias = '/api/category/';
  }

  // Obtener todas las categorías
  getCategorias(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlCategorias}`);
  }

  // Obtener una categoría por su id
  getCategoriaById(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlCategorias}/${id}`);
  }

  // Crear una nueva categoría
  createCategoria(categoria: any): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}${this.myApiUrlCategorias}/`,
      categoria
    );
  }

  // Actualizar una categoría
  updateCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(
      `${this.myAppUrl}${this.myApiUrlCategorias}/${id}`,
      categoria
    );
  }

  // Eliminar una categoría
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrlCategorias}/${id}`);
  }
}
