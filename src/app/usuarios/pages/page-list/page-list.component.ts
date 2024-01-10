import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../../components/form/form.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  data: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_usu', title: 'ID' },
    { field: 'user_usu', title: 'Usuario' },
    { field: 'pass_usu', title: 'Contraseña' },
    { field: 'rol_usu', title: 'Rol' },
  ];

  rol: any[] = [];

  keypadButtons: KeypadButton[] = [
    { icon: 'add', tooltip: 'AGREGAR', color: 'primary', action: 'NEW' },
  ];

  totalRecords = 0;
  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private usuariosService: UsuariosService
  ) {
    this.loadUsers();
  }
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.usuariosService.loadUser().subscribe({
      next: (res) => {
        // Si el backend ya maneja la paginación, ajuste la llamada para pasar `page` y `pageSize`.
        this.data = res.data.slice(skip, skip + pageSize);
        this.totalRecords = res.data.length;
      },
    });
  }

  loadUsers() {
    // Cambio de método
    this.usuariosService.loadUser().subscribe((data) => {
      console.log('HOLA  :  ', data.data);
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
      this.loadUsers();
    });
  }

  delete(id_usu: string) {
    console.log(id_usu);
    this.usuariosService.deleteUsers(id_usu).subscribe((response) => {
      console.log(response);
      this.loadUsers();
    });
  }
}
