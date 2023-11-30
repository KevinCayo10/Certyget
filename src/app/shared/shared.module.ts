import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TableComponent } from './components/table/table.component';
import { TitleComponent } from './components/title/title.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    ContainerComponent,
    KeypadButtonComponent,
    PaginatorComponent,
    TableComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  exports: [
    ContainerComponent,
    KeypadButtonComponent,
    PaginatorComponent,
    TableComponent,
    TitleComponent,
    MatTableModule,
  ],
})
export class SharedModule {}
