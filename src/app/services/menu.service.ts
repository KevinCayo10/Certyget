import { Injectable } from '@angular/core';
// Define la interfaz IMenu que representa la estructura de un elemento del menú
export interface IMenu {
  title: string;
  icon: string;
  url: string;
}
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // Lista privada de elementos de menú, cada uno representado por la interfaz IMenu
  private listMenu: IMenu[] = [
    {
      title: 'Categorías',
      url: '/categorias',
      icon: 'categorias',
    },
    {
      title: 'Certificados',
      url: '/certificados',
      icon: 'certificados',
    },
    {
      title: 'Eventos académicos',
      url: '/cursos',
      icon: 'cursos',
    },
    {
      title: 'Firmas',
      url: '/instructores',
      icon: 'firmas',
    },
    {
      title: 'Usuarios',
      url: '/usuarios',
      icon: 'usuarios',
    },
  ];
  // Método que devuelve una copia de la lista de elementos de menú
  constructor() {}
  getMenu(): IMenu[] {
    return [...this.listMenu];
  }
  // Método que busca un elemento de menú por su URL y devuelve el elemento si lo encuentra
  getMenuByUrl(url: string): IMenu {
    return this.listMenu.find(
      (menu) => menu.url.toLowerCase() === url.toLowerCase()
    ) as IMenu;
  }
}
