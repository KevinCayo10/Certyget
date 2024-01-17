import { Injectable } from '@angular/core';
export interface IMenu {
  title: string;
  icon: string;
  url: string;
}
@Injectable({
  providedIn: 'root',
})
export class MenuService {
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
  constructor() {}
  getMenu(): IMenu[] {
    return [...this.listMenu];
  }
  getMenuByUrl(url: string): IMenu {
    return this.listMenu.find(
      (menu) => menu.url.toLowerCase() === url.toLowerCase()
    ) as IMenu;
  }
}
