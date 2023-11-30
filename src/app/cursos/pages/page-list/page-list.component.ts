import { Component } from '@angular/core';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: any[] = [];
  registros: any[] = [
    {
      id_cur: 1,
      nom_cur: 'Concurso',
      fecha_inicio_cur: '27/05/2023',
      fecha_fin_cur: '28/06/2023',
      dur_cur: '2 meses',
    },
  ];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_cur', title: 'ID' },
    { field: 'nom_cur', title: 'NOMBRE' },
    { field: 'fecha_inicio_cur', title: 'FECHA INICIO' },
    { field: 'fecha_fin_cur', title: 'FECHA FIN' },
    { field: 'dur_cur', title: 'DURACIÓN' },
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
  constructor() {
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
  }

  delete(id: string) {}
}
