import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  previsualizacion!: string;
  archivos: any = [];
  emp_form: FormGroup;
  title = '';
  togglePassword = true;
  isEdit: boolean;
  puestos: string[] = [
    'Decano',
    'Coordinador de Carrera',
    'Docente',
    'Coordinador de Unidad de Investigación',
  ];
  autores: any[] = [];
  secciones: any[] = [];
  disponibilidad: string[] = ['Disponible', 'No disponible'];

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
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
      nom_pat_inst: new FormControl(this.data?.nom_pat_inst),
      nom_mat_inst: new FormControl(this.data?.nom_mat_inst),
      ape_pat_inst: new FormControl(this.data?.ape_pat_inst),
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
  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
    this.archivos.push(archivoCapturado);
  }
  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            blob: $event,
            image,
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            blob: null,
            image: null,
            base: null,
          });
        };
      } catch (e) {
        resolve({
          blob: null,
          image: null,
          base: null,
        });
      }
    });
}
