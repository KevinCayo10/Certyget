import { Component, Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { PageListComponent } from '../../pages/page-list/page-list.component';
import { read, utils } from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CertificadosService } from '../../services/certificados.service';

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
    const promises = this.data.map((participante, index) => {
      return new Promise<void>((resolve, reject) => {
        const certificateElement = document.querySelector(
          `#certificate-container-${index}`
        );
        console.log(certificateElement);

        html2canvas(certificateElement as HTMLElement, {
          allowTaint: true,
          logging: true,
          useCORS: true,
        })
          .then((canvas) => {
            const contentDataURL = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;

            pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);

            // Convert the PDF document to a Blob
            const certificado = pdf.output('blob');
            console.log('cer', certificado);
            this.saveOrSendPDF(certificado, participante)
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

    // Espera a que todas las promesas se resuelvan o una se rechace
    Promise.all(promises)
      .then(() => {
        console.log('Todos los certificados fueron procesados con éxito');
      })
      .catch((error) => {
        console.error('Error al procesar certificados:', error);
      });
  }

  private saveOrSendPDF(pdfBlob: Blob, participante: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Additional data needed for the certificado
      const ced_par = participante.ced_par; // Replace with the actual participant data
      const formData = new FormData();
      formData.append('certificado', pdfBlob, 'certificado.pdf');
      formData.append('ced_par', ced_par);
      formData.append('id_cur', this.id_cur!);

      this.certificadoService.addCertificados(formData).subscribe(
        (response) => {
          console.log(response);
          resolve();
        },
        (error) => {
          console.error('Error al guardar el certificado:', error);
          reject(error);
        }
      );
    });
  }
  registerParticipantes() {
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
