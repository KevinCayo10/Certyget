import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
// Importa la interfaz MetaDataColumn desde '../../interfaces/metacolumn.interfaces'
import { MetaDataColumn } from '../../interfaces/metacolumn.interfaces';
// Importa las clases MatColumnDef y MatTable desde '@angular/material/table'
import { MatColumnDef, MatTable } from '@angular/material/table';

@Component({
  selector: 'cer-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() data: any;
  @Input() metaDataColumns!: MetaDataColumn[];

  @ContentChildren(MatColumnDef, { descendants: true })
  columnsDef!: QueryList<MatColumnDef>;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  // Lista de nombres de campos para las columnas de la tabla
  listFields: string[] = [];
  // Método llamado cuando cambian las propiedades de entrada del componente
  ngOnChanges(changes: SimpleChanges) {
    if (changes['metaDataColumns']) {
      // Actualiza la lista de campos cuando cambian los metadatos de las columnas
      this.listFields = this.metaDataColumns.map((x) => x.field);
    }
  }
  // Método llamado después de que se han inicializado las instancias de contenido del componente
  ngAfterContentInit() {
    console.log(this.data);
    if (!this.columnsDef) {
      return;
    }
    // Itera sobre las instancias de MatColumnDef y agrega las columnas a la lista y la tabla
    this.columnsDef.forEach((columnDef) => {
      this.listFields.push(columnDef.name);
      this.table.addColumnDef(columnDef);
    });
  }
  // Función que verifica si un campo es una URL de imagen
  isImageField(field: string): boolean {
    const imageFields = ['url_cer', 'url_firma', 'url_gen_cer'];

    return imageFields.includes(field);
  }
}
