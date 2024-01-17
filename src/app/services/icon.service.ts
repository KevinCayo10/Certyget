import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
interface IIcon {
  name: string;
  path: string;
}
@Injectable({
  providedIn: 'root',
})
export class IconService {
  private listIcons: IIcon[] = [
    { name: 'logo', path: './../../assets/imagenes/logo.svg' },
    { name: 'avatar', path: './../../assets/imagenes/avatar.svg' },
    {
      name: 'administration',
      path: './../../assets/imagenes/administration.svg',
    },
    { name: 'categorias', path: './../../assets/imagenes/categorias.svg' },
    { name: 'usuarios', path: './../../assets/imagenes/usuarios.svg' },
    { name: 'certificados', path: './../../assets/imagenes/certificados.svg' },
    { name: 'cursos', path: './../../assets/imagenes/cursos.svg' },
    { name: 'menu', path: './../../assets/imagenes/menu.svg' },
    { name: 'instructores', path: './../../assets/imagenes/instructores.svg' },
    { name: 'firmas', path: './../../assets/imagenes/firmas.svg' },
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registryIcons();
  }
  registryIcons() {
    this.listIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }
}
