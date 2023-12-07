import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './components/form/form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [CommonModule, CategoriasRoutingModule, SharedModule, HttpClientModule],
})
export class CategoriasModule {}
