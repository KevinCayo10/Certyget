import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeypadButton } from '../../interfaces/keypadbutton.interface';

@Component({
  selector: 'cer-keypad-button',
  templateUrl: './keypad-button.component.html',
  styleUrls: ['./keypad-button.component.css'],
})
export class KeypadButtonComponent {
  // Propiedad de entrada que recibe la lista de botones
  @Input() keypadButtons: KeypadButton[] = [];
  // Propiedad de salida que emite un evento de clic con el valor de la acción realizada
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}
  ngOnInit(): void {}
  // Método que emite el evento de clic con la acción específica cuando se hace clic en un botón
  doAction(action: string) {
    this.onClick.emit(action);
  }
}
