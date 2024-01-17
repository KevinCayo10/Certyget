import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { InstructoresService } from '../../services/instructores.service';

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  // Propiedades del componente
  previsualizacion!: string;
  archivos: any[] = [];
  emp_form!: FormGroup;
  title = '';
  isEdit: boolean = false;
  puestos: string[] = [
    'Decano',
    'Coordinador de Carrera',
    'Docente',
    'Coordinador de Unidad de Investigación',
  ];

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private instructoresService: InstructoresService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data ? 'EDITAR FIRMA' : 'NUEVO FIRMA';
    this.isEdit = !!this.data;
    this.loadForm();
  }
  // Método para cargar el formulario
  loadForm() {
    this.emp_form = this.formBuilder.group({
      ced_inst: [this.data?.ced_inst || '', Validators.required],
      nom_pat_inst: [this.data?.nom_pat_inst || '', Validators.required],
      nom_mat_inst: [this.data?.nom_mat_inst || '', Validators.required],
      ape_pat_inst: [this.data?.ape_pat_inst || '', Validators.required],
      ape_mat_inst: [this.data?.ape_mat_inst || '', Validators.required],
      telf_inst: [this.data?.telf_inst || '', Validators.required],
      dir_inst: [this.data?.dir_inst || '', Validators.required],
      ciud_inst: [this.data?.ciud_inst || '', Validators.required],
      tit_inst: [this.data?.tit_inst || '', Validators.required],
      puesto_inst: [this.data?.puesto_inst || '', Validators.required],
      url_firma: [this.data?.url_firma || ''],
    });

    this.previsualizacion = this.data?.url_firma || '';
  }
  // Método para guardar los datos del formulario
  saveData() {
    if (this.emp_form.valid) {
      const formData = this.buildFormData();
      if (this.data) {
        console.log(formData);
        this.instructoresService
          .updateInstructor(this.data.ced_inst, formData)
          .subscribe(
            () => {
              this.showMessage('Registro editado correctamente');
              console.log('editando' + this.data.id + formData);
              this.reference.close();
            },
            (err) => {
              this.showMessage(err.error.message);
              console.log(err);
            }
          );
      } else {
        try {
          const formData = this.buildFormData();

          this.instructoresService.addInstructor(formData).subscribe(
            () => {
              this.showMessage('Registro ingresado correctamente');
              this.reference.close();
            },
            (err) => {
              this.showMessage(err.error.message);
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  // Método para construir el FormData a partir de los datos del formulario
  buildFormData(): FormData {
    const formData = new FormData();
    formData.append('ced_inst', this.emp_form.value.ced_inst);
    formData.append('nom_pat_inst', this.emp_form.value.nom_pat_inst);
    formData.append('nom_mat_inst', this.emp_form.value.nom_mat_inst);
    formData.append('ape_pat_inst', this.emp_form.value.ape_pat_inst);
    formData.append('ape_mat_inst', this.emp_form.value.ape_mat_inst);
    formData.append('telf_inst', this.emp_form.value.telf_inst);
    formData.append('dir_inst', this.emp_form.value.dir_inst);
    formData.append('ciud_inst', this.emp_form.value.ciud_inst);
    formData.append('tit_inst', this.emp_form.value.tit_inst);
    formData.append('puesto_inst', this.emp_form.value.puesto_inst);

    // Verifica si hay una nueva imagen y la añade al FormData
    const nuevaImagen = this.archivos[0];
    if (nuevaImagen) {
      formData.append('url_firma', nuevaImagen);
    } else {
      // Si no hay nueva imagen, verifica si hay una imagen existente y agrégala
      const imagenExistente = this.data?.url_firma;
      if (imagenExistente) {
        console.log(imagenExistente);
        formData.append('url_firma', imagenExistente);
      }
    }

    return formData;
  }
  // Método para mostrar mensajes en un Snackbar
  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
  // Método para capturar el archivo seleccionado por el usuario
  capturarFile(event: any): void {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
    this.archivos.push(archivoCapturado);
  }
  // Método para extraer la representación en base64 de un archivo
  extraerBase64 = async ($event: any): Promise<any> =>
    new Promise((resolve) => {
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
        reader.onerror = () => {
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
