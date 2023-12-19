import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from '../../services/categorias.service';
import { FormComponent } from '../../components/form/form.component';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {
  data: any[] = [];

  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_cate', title: 'ID' },
    { field: 'nom_cate', title: 'NOMBRE' },
    { field: 'desc_cate', title: 'DESCRIPCION' },
  ];
  keypadButtons: KeypadButton[] = [
    { icon: 'add', tooltip: 'AGREGAR', color: 'primary', action: 'NEW' },
  ];

  totalRecords = 0;

  constructor(
    private dialog: MatDialog,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCategory();
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    // Aquí debe asegurarse de que la paginación se maneje adecuadamente
    this.categoriasService.getCategorias().subscribe({
      next: (res) => {
        // Si el backend ya maneja la paginación, ajuste la llamada para pasar `page` y `pageSize`.
        this.data = res.data.slice(skip, skip + pageSize);
        this.totalRecords = res.data.length;
      },
      error: (err) => this.showMessage('Error al cargar las categorías'),
    });
  }

  loadCategory() {
    this.changePage(0);
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        // Implementar lógica de descarga
        break;
      case 'NEW':
        this.openForm();
        break;
      default:
        this.showMessage('Acción no reconocida');
        break;
    }
  }

  openForm(row: any = null) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: 'auto',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadCategory();
    });
  }

  delete(id: number) {
    this.categoriasService.deleteCategoria(id).subscribe({
      next: (res) => {
        this.showMessage('Categoría eliminada correctamente');
        this.loadCategory();
      },
      error: (err) => this.showMessage('Error al eliminar la categoría'),
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
