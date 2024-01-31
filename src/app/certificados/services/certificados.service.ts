import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CertificadosService {
  private myAppUrl: string;
  private myApiUrlCertificados: string;
  constructor(private http: HttpClient) {
    // Obtiene la URL base de la aplicación y la URL del API de certificados desde el entorno
    this.myAppUrl = environment.endpoint;
    this.myApiUrlCertificados = '/api/certificados/';
  }
  // Método para cargar certificados filtrados por curso
  loadCertificadosByCursos(
    id_cur: string
  ): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCertificados}/${id_cur}`
    );
  }
  // Método para cargar todos los certificados
  loadCertificados(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCertificados}`
    );
  }
  // Método para cargar detalles de cursos e instructores
  loadDetalleCursosInstructores(id_cur: any): Observable<{
    success: number;
    data: any[];
  }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCertificados}detalle/${id_cur}`
    );
  }

  loadSearchCertificados(
    search: any,
    id_cur: any
  ): Observable<{ success: number; data: any[] }> {
    const params = new HttpParams({ fromObject: { search, id_cur } });

    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCertificados}search`,
      { params }
    );
  }
  // Método para agregar participantes
  addParticipantes(partipantes: any): Observable<{
    success: number;
    data: any[];
  }> {
    return this.http.post<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCertificados}/participantes/`,
      partipantes
    );
  }
  // Método para agregar certificados
  addCertificados(certificados: any): Observable<{
    success: number;
    data: any[];
  }> {
    return this.http.post<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCertificados}`,
      certificados
    );
  }
  // Método para eliminar certificados por su ID
  deleteCertificados(id_gen_cer: any): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}${this.myApiUrlCertificados}${id_gen_cer}`
    );
  }
}
