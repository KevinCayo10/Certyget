import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './core/pages/page-login/page-login.component';
import { authGuard } from './guards/auth.guard';

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
    canActivate: [authGuard],
  },
  {
    path: 'certificados',
    loadChildren: () =>
      import('./certificados/certificados.module').then(
        (modulo) => modulo.CertificadosModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos/cursos.module').then((modulo) => modulo.CursosModule),
    canActivate: [authGuard],
  },
  {
    path: 'instructores',
    loadChildren: () =>
      import('./instructores/instructores.module').then(
        (modulo) => modulo.InstructoresModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then(
        (modulo) => modulo.UsuariosModule
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
