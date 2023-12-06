import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../../components/form/form.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: any[] = [];
  registros: any[] = [
    {
      ced_inst: '1234567890',
      nom_pat_inst: 'Juan',
      nom_mat_inst: 'Carlos',
      ape_pat_inst: 'Pérez',
      ape_mat_inst: 'Gómez',
      telf_inst: '123456789',
      dir_inst: 'Calle Principal 123',
      ciud_inst: 'Ciudad',
      tit_inst: 'Licenciado en Educación',
      puesto_inst: 'Docente',
      url_firma: 'https://example.com/firma',
    },
  ];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'ced_inst', title: 'Cédula' },
    { field: 'nom_pat_inst', title: 'Nombre Paterno' },
    { field: 'nom_mat_inst', title: 'Nombre Materno' },
    { field: 'ape_pat_inst', title: 'Apellido Paterno' },
    { field: 'ape_mat_inst', title: 'Apellido Materno' },
    { field: 'telf_inst', title: 'Teléfono' },
    { field: 'dir_inst', title: 'Dirección' },
    { field: 'ciud_inst', title: 'Ciudad' },
    { field: 'tit_inst', title: 'Título' },
    { field: 'puesto_inst', title: 'Puesto' },
    { field: 'url_firma', title: 'URL Firma' },
  ];

  keypadButtons: KeypadButton[] = [
    {
      icon: 'cloud_download',
      tooltip: 'EXPORTAR',
      color: 'accent',
      action: 'DOWNLOAD',
    },
    { icon: 'add', tooltip: 'AGREGAR', color: 'primary', action: 'NEW' },
  ];

  totalRecords = this.data.length;
  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadCategory();
  }
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.registros.slice(skip, skip + pageSize);
    console.log('aqui', this.data);
  }
  loadCategory() {
    console.log('ENTRO A LOAD');
    this.data = this.registros;
    this.totalRecords = this.data.length;
    this.changePage(0);
    console.log(this.data);
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        break;
      case 'NEW':
        this.openForm();
        break;
    }
  }

  showBottonSheet(
    title: string,
    fileName: string,
    data: any,
    metaDataColumn: MetaDataColumn[]
  ) {}

  openForm(row: any = null) {
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
  }

  delete(id: string) {}
}
