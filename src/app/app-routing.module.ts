import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './core/pages/page-login/page-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent,
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./categorias/categorias.module').then(
        (modulo) => modulo.CategoriasModule
      ),
  },
  {
    path: 'certificados',
    loadChildren: () =>
      import('./certificados/certificados.module').then(
        (modulo) => modulo.CertificadosModule
      ),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos/cursos.module').then((modulo) => modulo.CursosModule),
  },
  {
    path: 'instructores',
    loadChildren: () =>
      import('./instructores/instructores.module').then(
        (modulo) => modulo.InstructoresModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then(
        (modulo) => modulo.UsuariosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
