import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [CommonModule, UsuariosRoutingModule, SharedModule],
})
export class UsuariosModule {}
