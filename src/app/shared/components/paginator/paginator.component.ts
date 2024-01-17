import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '../../../../environments/environment.development';
@Component({
  selector: 'cer-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  // Propiedad de salida que emite un evento cuando cambia la página
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>();
  // Propiedad de entrada que representa la longitud total de elementos a paginar
  @Input() length!: number;
  // Propiedad de entrada que representa la página actual
  @Input() currentPage: number = 0;
  // Referencia al paginador de Angular Material
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = environment.PAGE_SIZE;
  // Método llamado cuando cambia la página
  changePage(event: any) {
    // Asigna el índice de la página actual desde el evento
    this.currentPage = event.pageIndex ?? event.value;
    // Actualiza el índice de la página en el paginador
    this.paginator.pageIndex = this.currentPage;
    // Emite un evento indicando el cambio de página
    this.onChangePage.emit(this.currentPage);
  }
}
