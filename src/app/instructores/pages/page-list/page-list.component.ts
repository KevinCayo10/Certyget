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
  // Datos que se mostrarán en la tabla
  data: any[] = [];
  // Metadatos para las columnas de la tabla
  metaDataColumns: MetaDataColumn[] = [
    { field: 'ced_inst', title: 'Cédula' },
    { field: 'nom_pat_inst', title: 'Nombre Paterno' },
    { field: 'nom_mat_inst', title: 'Nombre Materno' },
    { field: 'ape_pat_inst', title: 'Apellido Paterno' },
    { field: 'ape_mat_inst', title: 'Apellido Materno' },
    /* { field: 'telf_inst', title: 'Teléfono' },
    { field: 'dir_inst', title: 'Dirección' },
    { field: 'ciud_inst', title: 'Ciudad' }, */
    { field: 'tit_inst', title: 'Título' },
    { field: 'puesto_inst', title: 'Puesto' },
    { field: 'url_firma', title: 'URL Firma' },
  ];
  // Botones del teclado con icono, tooltip, color y acción asociada
  keypadButtons: KeypadButton[] = [
    { icon: 'add', tooltip: 'AGREGAR', color: 'primary', action: 'NEW' },
  ];
  // Total de registros para la paginación
  totalRecords = 0;
  constructor(
    private dialog: MatDialog,
    private instructoresService: InstructoresService,
    private snackBar: MatSnackBar
  ) {
    this.loadInstructores();
  }
  // Función que se ejecuta al cambiar de página en la paginación
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    // Carga de instructores con manejo de paginación
    this.instructoresService.loadInstructores().subscribe({
      next: (res) => {
        // Si el backend ya maneja la paginación, ajuste la llamada para pasar `page` y `pageSize`.
        this.data = res.data.slice(skip, skip + pageSize);
        this.totalRecords = res.data.length;
      },
      error: (err) => this.showMessage('Error al cargar los instructores'),
    });
  }
  // Carga inicial de instructores al inicializar el componente
  loadInstructores() {
    this.instructoresService.loadInstructores().subscribe((data) => {
      this.data = data.data;
      this.totalRecords = this.data.length;
      this.changePage(0);
    });
  }
  // Acciones a realizar según la acción del teclado
  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        break;
      case 'NEW':
        this.openForm();
        break;
    }
  }
  // Función para mostrar un Bottom Sheet (hoja inferior)
  showBottonSheet(
    title: string,
    fileName: string,
    data: any,
    metaDataColumn: MetaDataColumn[]
  ) {}
  // Abrir formulario para editar o agregar instructor
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
  // Eliminar instructor según su ID
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
  // Mostrar mensaje en la parte superior de la pantalla
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
