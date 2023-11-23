import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    PageLoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    MenuComponent
  ]
})
export class CoreModule { }
