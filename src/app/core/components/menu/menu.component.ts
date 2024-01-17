import { Component, EventEmitter, Output } from '@angular/core';
import { IMenu, MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'cer-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  listMenu: IMenu[]; // Arreglo de objetos IMenu que representa los elementos del menú
  expanded = true; // Variable que controla el estado de expansión/cierre del menú
  @Output() onToggleExpanded: EventEmitter<boolean> =
    new EventEmitter<boolean>(); // Evento de salida para notificar cambios en la expansión del menú
  // Constructor del componente que recibe el servicio MenuService
  constructor(private menuService: MenuService) {
    this.listMenu = menuService.getMenu();
  }
  // Método que cambia el estado de expansión/cierre del menú y emite el evento correspondiente
  toggleExpanded() {
    this.expanded = !this.expanded;
    this.onToggleExpanded.emit(this.expanded);
  }
}
