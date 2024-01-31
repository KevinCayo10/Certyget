import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { CertificadosService } from '../../services/certificados.service';
import { FormComponent } from '../../componentes/form/form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  // Propiedades públicas del componente
  @ViewChild(SearchComponent) cerSearchComponent!: SearchComponent;

  public selectedCursoId: any;
  public selectedCursoNom!: string;
  public searchAny: any;
  placeholder: any = 'Cédula, apellido o email';
  data: any[] = [];
  cursos: any[] = [];
  //COLUMNAS DE LA TABLA
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_gen_cer', title: 'ID' },
    { field: 'fecha_gen_cer', title: 'FECHA EMITIDA' },
    { field: 'ced_par', title: 'CEDULA PARTICIPANTE' },
    { field: 'email_par', title: 'EMAIL PARTICIPANTE' },
    { field: 'url_gen_cer', title: 'CERTIFICADO' },
    // { field: 'estado_cer', title: 'ESTADO' },
  ];

  totalRecords = 0;
  currentPage = 0;
  pageSize = environment.PAGE_SIZE;
  formulario!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private certificadosService: CertificadosService,
    private fb: FormBuilder
  ) {
    this.loadCursos();
    this.loadCertificados('', '');
  }
  ngOnInit(): void {
    this.formulario = this.fb.group({
      id_cate_cur: [null],
    });
    sessionStorage.removeItem('selectedCursoId');
    sessionStorage.removeItem('selectedCursoNom');
  }
  // Método para cambiar la página en la paginación
  changePage(page: number) {
    this.currentPage = page;
    this.loadCertificados(this.selectedCursoId, '');
  }
  // Método para cargar la lista de cursos desde el servicio
  loadCursos() {
    this.cursosService.loadCursos().subscribe((response) => {
      this.cursos = response.data;
    });
  }
  // Método para cargar la lista de certificados según el curso seleccionado
  loadCertificados(id_cur: any, search: any) {
    if (id_cur || search.length > 0) {
      this.certificadosService
        .loadSearchCertificados(search, id_cur)
        .subscribe((response) => {
          this.totalRecords = response.data.length;
          this.data = this.paginateData(
            response.data,
            this.currentPage,
            this.pageSize
          );
        });
    } else {
      this.certificadosService.loadCertificados().subscribe((response) => {
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
    this.loadCertificados(selectedValue, '');

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
      this.loadCertificados(this.selectedCursoId, '');
    });
  }
  // Método para realizar una acción (abrir formulario)
  doAction(): void {
    this.openForm();
  }

  buscarData(searchData: any) {
    this.searchAny = searchData.terminoBusqueda;
    const id_cur_select = sessionStorage.getItem('selectedCursoId');
    this.loadCertificados(id_cur_select, searchData.terminoBusqueda);
    console.log('ID_CUR_SELE', id_cur_select);
  }
  // Método para abrir el formulario
  openForm(row: any = null) {
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
    reference.afterClosed().subscribe((response) => {
      const id_cur_select = sessionStorage.getItem('selectedCursoId');
      this.loadCertificados(id_cur_select, '');
    });
  }

  clearFilter() {
    this.formulario.reset();
    this.cerSearchComponent.resetComponent();
    this.searchAny = null;
    this.selectedCursoId = null;
    this.loadCertificados('', '');
  }
  // Método para abrir el certificado en una nueva ventana
  openCertificate(url: string): void {
    window.open(url, '_blank');
  }
}
