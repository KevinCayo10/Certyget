import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificadosRoutingModule } from './certificados-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PageListComponent],
  imports: [
    CommonModule,
    CertificadosRoutingModule,
    SharedModule,
    MatIconModule,
  ],
})
export class CertificadosModule {}
