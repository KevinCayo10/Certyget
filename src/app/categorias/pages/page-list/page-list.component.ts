import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormComponent } from '../../components/form/form.component';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { environment } from 'src/environments/environment.development';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'cer-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {
  // Arreglo para almacenar datos de la tabla
  data: any[] = [];
  // Metadatos de las columnas de la tabla
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_cate', title: 'ID' },
    { field: 'nom_cate', title: 'NOMBRE' },
    { field: 'desc_cate', title: 'DESCRIPCION' },
  ];
  // Botones del teclado numérico
  keypadButtons: KeypadButton[] = [
    { icon: 'add', tooltip: 'AGREGAR', color: 'primary', action: 'NEW' },
  ];
  // Número total de registros para la paginación
  totalRecords = 0;

  constructor(
    private dialog: MatDialog,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCategory();
  }
  // Método para cambiar de página en la tabla
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    // Obtener categorías del servicio (ajustar para manejar paginación en el backend)
    this.categoriasService.getCategorias().subscribe({
      next: (res) => {
        this.data = res.data.slice(skip, skip + pageSize);
        this.totalRecords = res.data.length;
      },
      error: (err) => this.showMessage('Error al cargar las categorías'),
    });
  }
  // Método para cargar categorías al iniciar o cambiar de página
  loadCategory() {
    this.changePage(0);
  }
  // Método para realizar acciones según el botón del teclado numérico presionado
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
  // Método para abrir el formulario de edición o creación
  openForm(row: any = null) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: 'auto',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadCategory();
    });
  }
  // Método para eliminar una categoría
  delete(id: number) {
    this.categoriasService.deleteCategoria(id).subscribe({
      next: (res) => {
        this.showMessage('Categoría eliminada correctamente');
        this.loadCategory();
      },
      error: (err) => this.showMessage('Error al eliminar la categoría'),
    });
  }
  // Método para mostrar mensajes con Snackbar
  showMessage(
    message: string,
    duration: number = 3000,
    action: string = 'Cerrar'
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}
