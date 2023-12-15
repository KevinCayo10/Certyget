import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadosRoutingModule } from './certificados-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from './componentes/form/form.component';

@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [
    CommonModule,
    CertificadosRoutingModule,
    SharedModule,
    MatIconModule,
  ],
  providers: [PageListComponent],
})
export class CertificadosModule {}
