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
  // Formulario reactivo que representa los campos del componente
  emp_form: FormGroup;
  // Título del formulario (Nuevo o Editar)
  title = '';
  // Bandera para indicar si se está editando una categoría existente
  isEdit: boolean;
  // Constructor del componente
  constructor(
    private reference: MatDialogRef<FormComponent>,
    private categoriasService: CategoriasService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Determina el título del formulario (Nuevo o Editar) y si se está editando
    this.title = data ? 'EDITAR CATEGORÍA' : 'NUEVA CATEGORÍA';
    this.isEdit = data ? true : false;
    // Inicializa el formulario reactivo con los campos de la categoría
    this.emp_form = this.formBuilder.group({
      id_cate: '',
      nom_cate: '',
      desc_cate: '',
    });
  }

  ngOnInit(): void {
    this.loadForm();
  }
  // Método para cargar los datos en el formulario reactivo
  loadForm() {
    this.emp_form = this.formBuilder.group({
      id_cate: new FormControl(this.data?.id_cate),
      nom_cate: new FormControl(this.data?.nom_cate, [Validators.required]),
      desc_cate: new FormControl(this.data?.desc_cate, Validators.required),
    });
  }
  // Método llamado al intentar guardar los datos del formulario
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
  // Método para mostrar un mensaje en la interfaz usando el servicio SnackBar

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}
