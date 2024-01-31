import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './components/form/form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { InfoComponent } from './components/info/info.component';
@NgModule({
  declarations: [PageListComponent, FormComponent, InfoComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatListModule,
    AngularEditorModule,
  ],
  providers: [],
})
export class CursosModule {}
