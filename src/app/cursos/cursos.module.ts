import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PageListComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule
  ]
})
export class CursosModule { }
