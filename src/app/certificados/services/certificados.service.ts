import { HttpClient } from '@angular/common/http';
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
    this.myAppUrl = environment.endpoint;
    this.myApiUrlCertificados = '/api/certificados/';
  }

  loadCertificadosByCursos(
    id_cur: string
  ): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCertificados}/${id_cur}`
    );
  }
  loadCertificados(): Observable<{ success: number; data: any[] }> {
    return this.http.get<{ success: number; data: any[] }>(
      `${this.myAppUrl}${this.myApiUrlCertificados}`
    );
  }
}
