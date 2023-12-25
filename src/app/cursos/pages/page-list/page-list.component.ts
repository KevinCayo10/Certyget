import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../../components/form/form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../models/cursos.models';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_cur', title: 'ID' },
    { field: 'nom_cur', title: 'NOMBRE' },
    { field: 'fecha_inicio_cur', title: 'FECHA INICIO' },
    { field: 'fecha_fin_cur', title: 'FECHA FIN' },
    { field: 'dur_cur', title: 'DURACIÓN' },
    { field: 'nom_cate', title: 'CATEGORIA' },
    { field: 'url_cer', title: 'PLANTILLA' },
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
    private dialog: MatDialog,
    private cursosService: CursosService,
    private snackBar: MatSnackBar
  ) {
    this.loadCursos();
  }
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.data.slice(skip, skip + pageSize);
    console.log('aqui', this.data);
  }

  loadCursos() {
    this.cursosService.loadCursos().subscribe((response) => {
      /*this.data = this.registros;
      this.totalRecords = this.data.length;
      this.changePage(0);
      console.log(this.data);*/
      if (response.success == 1) {
        this.data = response.data;
        this.totalRecords = this.data.length;
        this.changePage(0);
        console.log('aqui esta cargando la data: ', this.data);
      }
    });
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
      this.loadCursos();
    });
  }

  delete(id: number) {
    this.cursosService.deleteCurso(id).subscribe({
      next: (res) => {
        this.showMessage('Curso eliminado correctamente');
        this.loadCursos();
      },
      error: (err) => this.showMessage('Error al eliminar el curso'),
    });
  }
  showMessage(
    message: string,
    duration: number = 3000,
    action: string = 'Cerrar'
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
    });
  }
}
interface ApiResponse {
  success: number;
  data: Cursos[];
}
