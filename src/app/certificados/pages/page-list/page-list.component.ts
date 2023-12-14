import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
/* import { FormComponent } from '../../components/form/form.component'; */
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { CertificadosService } from '../../services/certificados.service';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: any[] = [];
  cursos: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_gen_cer', title: 'ID' },
    { field: 'fecha_gen_cer', title: 'FECHA EMITIDA' },
    { field: 'ced_par', title: 'CEDULA PARTICIPANTE' },
    { field: 'email_par', title: 'EMAIL PARTICIPANTE' },
    { field: 'url_gen_cer', title: 'CERTIFICADO' },
    { field: 'estado_cer', title: 'ESTADO' },
  ];

  totalRecords = this.data.length;
  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cursosService: CursosService,
    private certificadosService: CertificadosService
  ) {
    this.loadCursos();
    this.loadCertificados('');
  }
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.data.slice(skip, skip + pageSize);
    console.log('aqui', this.data);
  }
  loadCursos() {
    this.cursosService.loadCursos().subscribe((response) => {
      this.cursos = response.data;
    });
  }

  loadCertificados(id_cur: any) {
    if (id_cur === '') {
      this.certificadosService.loadCertificados().subscribe((response) => {
        console.log('DATA:  ', response.data);
        this.data = response.data;
      });
    } else {
      this.certificadosService
        .loadCertificadosByCursos(id_cur)
        .subscribe((response) => {
          this.data = response.data;
        });
    }
  }
  onCursoSelectionChange(selectedValue: any): void {
    console.log('Curso seleccionado:', selectedValue);
    this.loadCertificados(selectedValue);
  }
  /* openForm(row: any = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row,
    };
    const reference: MatDialogRef<FormComponent> = this.dialog.open(
      FormComponent,
      options
    );
    reference.afterClosed().subscribe((response) => {
      this.loadCategory();
    });
  } */

  delete(id: string) {}
}
