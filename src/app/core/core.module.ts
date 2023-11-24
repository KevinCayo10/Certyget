import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    PageLoginComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,

    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    MatIconModule,
    FlexLayoutModule,
    MenuComponent,
    PageLoginComponent,
    MenuComponent,
    MenuComponent,
    MatSidenavModule,
    FlexLayoutModule,
    MatIconModule,
  ],
})
export class CoreModule {}
