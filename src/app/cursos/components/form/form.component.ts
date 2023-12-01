import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    //private booksService: BooksService,
    //private authorsService: AuthorsService, // Cambiado a authorsService
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    //private seccionService: SeccionService, // Cambiado a seccionService
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR USUARIO' : 'NUEVO USUARIO';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({
      id_cur: '',
      nom_cur: '',
      fecha_inicio_cur: '',
      fecha_fin_cur: '',
      dur_cur: '',
    });
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.emp_form = this.formBuilder.group({
      id_cur: new FormControl(this.data?.id_cur),
      nom_cur: new FormControl(this.data?.nom_cur, [
        Validators.pattern('^[a-zA-Z0-9]*$'), // Puedes ajustar el patrón según tus necesidades
        Validators.required,
      ]),
      fecha_inicio_cur: new FormControl(
        this.data?.fecha_inicio_cur,
        Validators.required
      ),
      fecha_fin_cur: new FormControl(
        this.data?.fecha_fin_cur,
        Validators.required
      ),
      dur_cur: new FormControl(this.data?.dur_cur, Validators.required),
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
