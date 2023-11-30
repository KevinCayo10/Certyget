import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { ContainerComponent } from './components/container/container.component';
import { TableComponent } from './components/table/table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
    KeypadButtonComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    KeypadButtonComponent,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    PaginatorComponent,
    MatToolbarModule,

    MatPaginatorModule,
  ],
})
export class SharedModule {}
