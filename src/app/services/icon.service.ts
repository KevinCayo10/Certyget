import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
// Interfaz que define la estructura de un ícono con un nombre y una ruta
interface IIcon {
  name: string;
  path: string;
}
@Injectable({
  providedIn: 'root',
})
export class IconService {
  // Lista de íconos con sus nombres y rutas
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
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registryIcons();
  }
  // Método para registrar los íconos en MatIconRegistry
  registryIcons() {
    this.listIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }
}
