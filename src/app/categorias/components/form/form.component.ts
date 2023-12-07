import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../models/categoria.model';
import { CategoriasService } from '../../services/categorias.service';

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
    private categoriasService: CategoriasService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR CATEGORÍA' : 'NUEVA CATEGORÍA';
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
      const categoria: Categoria = this.emp_form.value;
      if (this.isEdit) {
        this.categoriasService.updateCategoria(categoria.id_cate, categoria)
          .subscribe({
            next: (response) => {
              this.showMessage('Categoría actualizada con éxito');
              this.reference.close();
            },
            error: () => this.showMessage('Error al actualizar la categoría', 3000, 'Cerrar')
          });
      } else {
        this.categoriasService.createCategoria(categoria)
          .subscribe({
            next: (response) => {
              this.showMessage('Categoría creada con éxito');
              this.reference.close();
            },
            error: () => this.showMessage('Error al crear la categoría', 3000, 'Cerrar')
          });
      }
    }
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
}
