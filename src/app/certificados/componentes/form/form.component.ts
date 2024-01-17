import { ChangeDetectorRef, Component, Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { read, utils } from 'xlsx';
import html2canvas from 'html2canvas';
import { CertificadosService } from '../../services/certificados.service';
import { MatDialogRef } from '@angular/material/dialog';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  // Propiedades de Datos
  allData: any[] = []; // Agrega una referencia a todos los datos
  data: any[] = [];
  detalleCursosInstructores: any = {};
  totalRecords = 0;
  // Propiedades para la Vista
  title = sessionStorage.getItem('selectedCursoNom');
  id_cur = sessionStorage.getItem('selectedCursoId');
  fecha_actual: any;
  certificates: any[] = [];
  nom_cur: any = '';
  fecha_inicio_cur: any = '';
  dur_cur: any = '';
  nom_cate: any = '';
  // Metadatos de Columnas para la Tabla
  metaDataColumns: MetaDataColumn[] = [
    { field: 'ced_par', title: 'CEDULA' },
    { field: 'nom_pat_par', title: '1ER NOMBRE' },
    { field: 'nom_mat_par', title: '2DO NOMBRE' },
    { field: 'ape_pat_par', title: '1ER APELLIDO' },
    { field: 'ape_mat_par', title: '2DO APELLIDO' },
    { field: 'email_par', title: 'EMAIL' },
    { field: 'telf_par', title: 'TELEFONO' },
  ];

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private snackBar: MatSnackBar,
    private certificadoService: CertificadosService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    this.loadDetalleCursosInstructores();
  }
  // Propiedad para Contenido Seguro de Certificado HTML
  certificadoContent!: SafeHtml;

  ngOnInit(): void {}
  // Método para cargar detalles de cursos e instructores
  loadDetalleCursosInstructores() {
    const fecha = new Date();

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    const diaFormateado = dia < 10 ? `0${dia}` : dia.toString();
    const mesFormateado = mes < 10 ? `0${mes}` : mes.toString();

    this.fecha_actual = `${diaFormateado}/${mesFormateado}/${año}`;

    this.certificadoService
      .loadDetalleCursosInstructores(this.id_cur)
      .subscribe((response) => {
        this.detalleCursosInstructores = response.data;
        console.log(this.detalleCursosInstructores);
        this.nom_cur = this.detalleCursosInstructores.curso.nom_cur;
        this.fecha_inicio_cur =
          this.detalleCursosInstructores.curso.fecha_inicio_cur;
        this.dur_cur = this.detalleCursosInstructores.curso.dur_cur;
        this.nom_cate = this.detalleCursosInstructores.curso.nom_cate;

        const contenidoHtml = this.detalleCursosInstructores.curso.det_cer;
        console.log(contenidoHtml);
        this.certificadoContent = this.sanitizer.bypassSecurityTrustHtml(
          contenidoHtml
            .replace('{{evento}}', this.nom_cur)
            .replace('{{categoria}}', this.nom_cate)
            .replace('{{fecha_inicio}}', this.fecha_inicio_cur)
            .replace('{{duración}}', this.dur_cur)
        );
      });
  }
  // Método para generar certificados
  public generateCertificates() {
    const certificatesContainer = document.getElementById(
      'certificates-section-container'
    );
    if (certificatesContainer) {
      certificatesContainer.style.display = 'block';
    }

    const promises = this.data.map((participante, index) => {
      return new Promise<void>((resolve, reject) => {
        const certificateElement = document.querySelector(
          `#certificate-container-${index}`
        );
        html2canvas(certificateElement as HTMLElement, {
          allowTaint: true,
          logging: true,
          useCORS: true,
          scale: 4,
        })
          .then((canvas) => {
            const contentDataURL = canvas.toDataURL('image/png');

            this.saveOrSendImage(contentDataURL, participante)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    Promise.all(promises)
      .then(() => {
        console.log('Todos los certificados fueron procesados con éxito');

        if (certificatesContainer) {
          certificatesContainer.style.display = 'none';
        }
      })
      .catch((error) => {
        console.error('Error al procesar certificados:', error);

        if (certificatesContainer) {
          certificatesContainer.style.display = 'none';
        }
      });
  }
  // Método para guardar datos (a implementar)
  saveData() {}
  // Método para guardar o enviar imagen del certificado
  private saveOrSendImage(
    imageDataURL: string,
    participante: any
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const ced_par = participante.ced_par;
      const formData = new FormData();
      formData.append(
        'certificado',
        this.dataURItoBlob(imageDataURL),
        'certificado.png'
      );
      formData.append('ced_par', ced_par);
      formData.append('id_cur', this.id_cur!);
      formData.append('nom_par', participante.nom_pat_par);
      formData.append('ape_par', participante.ape_pat_par);
      formData.append('email_par', participante.email_par);
      formData.append('nom_cur', this.nom_cur);

      this.certificadoService.addCertificados(formData).subscribe(
        (response) => {
          console.log(response);
          resolve();
          this.reference.close();
        },
        (error) => {
          console.error('Error al guardar el certificado como imagen:', error);
          reject(error);
        }
      );
    });
  }
  // Método para convertir URI de datos en Blob
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }
  // Método para registrar participantes
  registerParticipantes() {
    console.log('DATA : ', this.data);
    this.certificadoService.addParticipantes(this.data).subscribe(
      (response) => {
        console.log(response);
        this.showMessage('Registro ingresado correctamente');
      },
      (err) => {
        this.showMessage(err.error.message);
      }
    );
  }
  // Método para mostrar mensajes con Snackbar
  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
  // Método para cambiar la página en la tabla paginada
  changePage(page: number) {
    let tamReg = environment.PAGE_SIZE;
    tamReg = 4;
    const pageSize = tamReg;
    const startIndex = pageSize * page;

    this.data = this.data.slice(startIndex, startIndex + pageSize);
    this.totalRecords = this.data.length;
  }
  // Método para importar datos desde un archivo CSV
  csvImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const row = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.data = row;
          console.log('DATA : ', this.data);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  // Método para cargar participantes (¿utilizada?)
  loadParticipantes() {
    console.log(sessionStorage.getItem('selectedCursoId'));

    this.changePage(0);
  }
}
