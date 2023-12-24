import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../../components/form/form.component';
import { InstructoresService } from '../../services/instructores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: any[] = [];

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
    private dialog: MatDialog,
    private instructoresService: InstructoresService,
    private snackBar: MatSnackBar
  ) {
    this.loadInstructores();
  }
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.data.slice(skip, skip + pageSize);
    console.log('aqui', this.data);
  }
  loadInstructores() {
    this.instructoresService.loadInstructores().subscribe((data) => {
      this.data = data.data;
      this.totalRecords = this.data.length;
      this.changePage(0);
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
      this.loadInstructores();
    });
  }

  delete(id: number) {
    this.instructoresService.deleteInstructor(id).subscribe({
      next: (res) => {
        this.showMessage('Instructor eliminado exitosamente');
        this.loadInstructores();
      },
      error: (err) => {
        this.showMessage('Error al eliminar el instructor');
        console.log(err);
      },
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
