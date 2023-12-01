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
      ced_inst: '',
      nom_pat_inst: '',
      nom_mat_inst: '',
      ape_pat_inst: '',
      ape_mat_inst: '',
      telf_inst: '',
      dir_inst: '',
      ciud_inst: '',
      tit_inst: '',
      puesto_inst: '',
      url_firma: '',
    });
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.emp_form = this.formBuilder.group({
      ced_inst: new FormControl(this.data?.ced_inst),
      nom_pat_inst: new FormControl(
        this.data?.nom_pat_inst,
        Validators.required
      ),
      nom_mat_inst: new FormControl(this.data?.nom_mat_inst),
      ape_pat_inst: new FormControl(
        this.data?.ape_pat_inst,
        Validators.required
      ),
      ape_mat_inst: new FormControl(this.data?.ape_mat_inst),
      telf_inst: new FormControl(this.data?.telf_inst),
      dir_inst: new FormControl(this.data?.dir_inst),
      ciud_inst: new FormControl(this.data?.ciud_inst),
      tit_inst: new FormControl(this.data?.tit_inst),
      puesto_inst: new FormControl(this.data?.puesto_inst),
      url_firma: new FormControl(this.data?.url_firma),
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
