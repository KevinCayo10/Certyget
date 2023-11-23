import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TableComponent } from './components/table/table.component';
import { TitleComponent } from './components/title/title.component';



@NgModule({
  declarations: [
    ContainerComponent,
    KeypadButtonComponent,
    PaginatorComponent,
    TableComponent,
    TitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    KeypadButtonComponent,
    PaginatorComponent,
    TableComponent,
    TitleComponent
  ]
})
export class SharedModule { }
