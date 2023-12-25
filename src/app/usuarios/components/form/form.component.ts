import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  roles: string[] = ['ADMIN', 'ESTUDIANTE'];

  emp_form: FormGroup;
  title = '';
  togglePassword = true;
  isEdit: boolean;
  constructor(
    private reference: MatDialogRef<FormComponent>,
    private userServices: UsuariosService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    //private seccionService: SeccionService, // Cambiado a seccionService
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR USUARIO' : 'NUEVO USUARIO';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({
      id_usu: '',
      user_usu: '',
      pass_usu: '',
      rol_usu: '',
    });
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.emp_form = this.formBuilder.group({
      id_usu: new FormControl(this.data?.id_usu),
      user_usu: new FormControl(this.data?.user_usu, Validators.required),
      pass_usu: new FormControl('', Validators.required),
      rol_usu: new FormControl(this.data?.rol_usu, Validators.required),
    });
  }

  saveData() {
    if (this.emp_form.valid) {
      if (this.data) {
        this.userServices
          .updateUsers(this.data.id_usu, this.emp_form.value)
          .subscribe((response) => {
            console.log('UPDATE: ', this.emp_form);
            this.showMessage('Registro actualizado correctamente');
            this.reference.close();
          });
      } else {
        console.log('SAVE: ', this.emp_form);
        this.userServices
          .addUsers(this.emp_form.value)
          .subscribe((response) => {
            this.showMessage('Registro ingresado correctamente');
            this.reference.close();
          });
      }
    }
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
}
