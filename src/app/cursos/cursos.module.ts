import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './components/form/form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    MatDatepickerModule,
  ],
})
export class CursosModule {}
