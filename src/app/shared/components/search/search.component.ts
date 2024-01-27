import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cer-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  formulario!: FormGroup;
  @Output() buscadorEnviado: EventEmitter<any> = new EventEmitter();
  @Input() placeholder: any;
  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulario = new FormGroup({
      terminoBusqueda: new FormControl(''),
    });
  }
  buscar() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      this.buscadorEnviado.emit(formData);
    }
  }
}
