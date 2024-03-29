import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MetaDataColumn } from '../../interfaces/metacolumn.interfaces';
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
  listFields: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metaDataColumns']) {
      this.listFields = this.metaDataColumns.map((x) => x.field);
    }
  }

  ngAfterContentInit() {
    console.log(this.data);
    if (!this.columnsDef) {
      return;
    }
    this.columnsDef.forEach((columnDef) => {
      this.listFields.push(columnDef.name);
      this.table.addColumnDef(columnDef);
    });
  }
  isImageField(field: string): boolean {
    const imageFields = ['url_cer', 'url_firma'];

    return imageFields.includes(field);
  }
}
