import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  emp_form: FormGroup;
  title = '';
  togglePassword = true;
  isEdit: boolean;
  generos: string[] = [
    'Aventura',
    'Ciencia Ficción',
    'Drama',
    'Fantasía',
    'Infantil',
    'Romance',
    'Terror',
  ];
  autores: any[] = [];
  secciones: any[] = [];
  disponibilidad: string[] = ['Disponible', 'No disponible'];

  constructor(
    private reference: MatDialogRef<FormComponent>,
    
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR USUARIO' : 'NUEVO USUARIO';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({
      id_cate: '',
      nom_cate: '',
      desc_cate: '',
    });
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.emp_form = this.formBuilder.group({
      id_cate: new FormControl(this.data?.id_cate),
      nom_cate: new FormControl(this.data?.nom_cate, [
        Validators.pattern('^[a-zA-Z0-9]*$'), // Puedes ajustar el patrón según tus necesidades
        Validators.required,
      ]),
      desc_cate: new FormControl(this.data?.desc_cate, Validators.required),
    });
  }

  saveData() {
    if (this.emp_form.valid) {
      if (this.data) {
      }
    }
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
}
