import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  emp_form: FormGroup;
  title = '';
  isEdit: boolean;
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
      nom_cate: new FormControl(this.data?.nom_cate, [Validators.required]),
      desc_cate: new FormControl(this.data?.desc_cate, Validators.required),
    });
  }

  saveData() {
    if (this.emp_form.valid) {
      if (this.isEdit) {
        // Actualizar categoría
        this.categoriasService
          .updateCategoria(this.data.id_cate, this.emp_form.value)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.showMessage('Categoría actualizada correctamente');
              this.reference.close();
            },
            error: (err) =>
              this.showMessage('Error al actualizar la categoría'),
          });
      } else {
        // Crear nueva categoría
        this.categoriasService.createCategoria(this.emp_form.value).subscribe({
          next: (res) => {
            this.showMessage('Categoría creada correctamente');
            this.reference.close();
          },
          error: (err) => this.showMessage('Error al crear la categoría'),
        });
      }
    }
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
}
