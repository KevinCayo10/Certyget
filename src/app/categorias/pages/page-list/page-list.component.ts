import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../../components/form/form.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: any[] = [];
  registros: any[] = [
    {
      id_cate: 1,
      nom_cate: 'Concurso',
      desc_cate: '1er Lugar',
    },
    {
      id_cate: 2,
      nom_cate: 'Concurso',
      desc_cate: '1er Lugar',
    },
  ];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_cate', title: 'ID' },
    { field: 'nom_cate', title: 'NOMBRE' },
    { field: 'desc_cate', title: 'DESCRIPCION' },
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
