import { Component, Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { PageListComponent } from '../../pages/page-list/page-list.component';
import { read, utils } from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CertificadosService } from '../../services/certificados.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  allData: any[] = []; // Agrega una referencia a todos los datos
  data: any[] = [];
  detalleCursosInstructores: any = {};
  totalRecords = 0;
  title = sessionStorage.getItem('selectedCursoNom');
  id_cur = sessionStorage.getItem('selectedCursoId');
  fecha_actual: any;
  certificates: any[] = [];
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
    private pageListComponent: PageListComponent,
    private certificadoService: CertificadosService
  ) {
    this.loadDetalleCursosInstructores();
  }

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización si es necesario
    // this.loadParticipantes();
  }
  loadDetalleCursosInstructores() {
    // Obtener la fecha actual
    const fecha = new Date();

    // Obtener día, mes y año
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
    const año = fecha.getFullYear();

    // Formatear los componentes de fecha con ceros a la izquierda si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia.toString();
    const mesFormateado = mes < 10 ? `0${mes}` : mes.toString();

    // Crear la cadena de fecha con el formato dd/mm/aaaa
    this.fecha_actual = `${diaFormateado}/${mesFormateado}/${año}`;

    this.certificadoService
      .loadDetalleCursosInstructores(this.id_cur)
      .subscribe((response) => {
        this.detalleCursosInstructores = response.data;
        console.log(
          'detalleCursosInstructores : ',
          this.detalleCursosInstructores.curso.url_plantilla
        );
      });
  }
  saveData() {
    // Puedes agregar lógica de guardado si es necesario
  }
  public generateCertificates() {
    // Muestra el contenedor antes de la captura de pantalla
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
            // Convertir el canvas a una imagen PNG
            const contentDataURL = canvas.toDataURL('image/png');

            // Llamar a saveOrSendImage para guardar o enviar la imagen
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

    // Esperar a que todas las promesas se resuelvan o una se rechace
    Promise.all(promises)
      .then(() => {
        console.log('Todos los certificados fueron procesados con éxito');

        // Oculta el contenedor después de la captura de pantalla
        if (certificatesContainer) {
          certificatesContainer.style.display = 'none';
        }
      })
      .catch((error) => {
        console.error('Error al procesar certificados:', error);

        // Asegúrate de ocultar el contenedor incluso en caso de error
        if (certificatesContainer) {
          certificatesContainer.style.display = 'none';
        }
      });
  }

  private saveOrSendImage(
    imageDataURL: string,
    participante: any
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Datos adicionales necesarios para el certificado
      const ced_par = participante.ced_par; // Reemplazar con los datos reales del participante
      const formData = new FormData();
      formData.append(
        'certificado',
        this.dataURItoBlob(imageDataURL), // Call as a member function using 'this'
        'certificado.png'
      );
      formData.append('ced_par', ced_par);
      formData.append('id_cur', this.id_cur!);

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

  // Función auxiliar para convertir un URI de datos a Blob
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
  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }

  changePage(page: number) {
    let tamReg = environment.PAGE_SIZE;
    tamReg = 4;
    const pageSize = tamReg;
    const startIndex = pageSize * page;

    // Hace referencia a 'allData' en lugar de 'data'
    this.data = this.data.slice(startIndex, startIndex + pageSize);
    this.totalRecords = this.data.length;
  }
  users: any[] = [];
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

  loadParticipantes() {
    console.log(sessionStorage.getItem('selectedCursoId'));

    this.changePage(0);
  }
}
