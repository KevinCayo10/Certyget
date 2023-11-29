import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeypadButton } from '../../interfaces/keypadbutton.interface';

@Component({
  selector: 'cer-keypad-button',
  templateUrl: './keypad-button.component.html',
  styleUrls: ['./keypad-button.component.css']
})
export class KeypadButtonComponent {
  @Input() keypadButtons: KeypadButton[] = [];
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}
  ngOnInit(): void {}
  doAction(action: string) {
    this.onClick.emit(action);
  }
}
