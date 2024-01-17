import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { CertificadosService } from '../../services/certificados.service';
import { FormComponent } from '../../componentes/form/form.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  // Propiedades públicas del componente
  public selectedCursoId: any;
  public selectedCursoNom!: string;

  data: any[] = [];
  cursos: any[] = [];
  //COLUMNAS DE LA TABLA
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_gen_cer', title: 'ID' },
    { field: 'fecha_gen_cer', title: 'FECHA EMITIDA' },
    { field: 'ced_par', title: 'CEDULA PARTICIPANTE' },
    { field: 'email_par', title: 'EMAIL PARTICIPANTE' },
    { field: 'url_gen_cer', title: 'CERTIFICADO' },
    { field: 'estado_cer', title: 'ESTADO' },
  ];

  totalRecords = 0;
  currentPage = 0;
  pageSize = environment.PAGE_SIZE;

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private certificadosService: CertificadosService
  ) {
    this.loadCursos();
    this.loadCertificados('');
  }
  // Método para cambiar la página en la paginación
  changePage(page: number) {
    this.currentPage = page;
    this.loadCertificados(this.selectedCursoId);
  }
  // Método para cargar la lista de cursos desde el servicio
  loadCursos() {
    this.cursosService.loadCursos().subscribe((response) => {
      this.cursos = response.data;
    });
  }
  // Método para cargar la lista de certificados según el curso seleccionado
  loadCertificados(id_cur: any) {
    if (id_cur === '') {
      this.certificadosService.loadCertificados().subscribe((response) => {
        this.totalRecords = response.data.length;
        this.data = this.paginateData(
          response.data,
          this.currentPage,
          this.pageSize
        );
      });
    } else {
      this.certificadosService
        .loadCertificadosByCursos(id_cur)
        .subscribe((response) => {
          this.totalRecords = response.data.length;
          this.data = this.paginateData(
            response.data,
            this.currentPage,
            this.pageSize
          );
        });
    }
  }
  // Método para paginar los datos según la página actual y tamaño de página
  paginateData(data: any[], page: number, pageSize: number): any[] {
    const startIndex = pageSize * page;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }
  // Método para manejar el cambio en la selección de cursos
  onCursoSelectionChange(selectedValue: any): void {
    console.log('Curso seleccionado:', selectedValue);
    this.loadCertificados(selectedValue);

    const selectedCurso = this.cursos.find(
      (curso) => curso.id_cur === selectedValue
    );
    if (selectedCurso) {
      this.selectedCursoId = selectedCurso.id_cur;
      this.selectedCursoNom = selectedCurso.nom_cur;
      sessionStorage.setItem('selectedCursoId', this.selectedCursoId);
      sessionStorage.setItem('selectedCursoNom', this.selectedCursoNom);
    }
  }
  // Método para eliminar un certificado
  delete(id: string) {
    this.certificadosService.deleteCertificados(id).subscribe((response) => {
      this.loadCertificados(this.selectedCursoId);
    });
  }
  // Método para realizar una acción (abrir formulario)
  doAction(): void {
    this.openForm();
  }
  // Método para abrir el formulario
  openForm(row: any = null) {
    console.log('Datos que se pasan al FormComponent:', row);
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: {
        selectedCursoId: this.selectedCursoId,
        selectedCursoNom: this.selectedCursoNom,
      },
    };
    const reference: MatDialogRef<FormComponent> = this.dialog.open(
      FormComponent,
      options
    );
    reference.afterClosed().subscribe((response) => {});
  }
  // Método para abrir el certificado en una nueva ventana
  openCertificate(url: string): void {
    window.open(url, '_blank');
  }
}
