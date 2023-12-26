import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { ContainerComponent } from './components/container/container.component';
import { TableComponent } from './components/table/table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { ModalCertificadosComponent } from './components/modal-certificados/modal-certificados.component';
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
    FlexLayoutModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
  ],
  exports: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
    NgScrollbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    KeypadButtonComponent,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    PaginatorComponent,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatInputModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class SharedModule {}
