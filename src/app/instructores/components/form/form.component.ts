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
import { Observable } from 'rxjs';
interface GrupoTitulo {
  name: string;
  titulo: { value: string; viewValue: string }[];
}
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
    'DECANO/A',
    'SUBDECANO/A',
    'COORDINADOR/A',
    'DOCENTE',
    'UODIDE',
  ];
  tituloGrupo: GrupoTitulo[] = [
    {
      name: 'Tercer Nivel',
      titulo: [
        { value: 'Ing.', viewValue: 'Ingeniero/a' },
        { value: 'Tnlgo.', viewValue: 'Tecnólogo/a' },
        { value: 'Lic.', viewValue: 'Licenciado/a' },
      ],
    },
    {
      name: 'Cuarto Nivel',
      titulo: [
        { value: 'Mgtr.', viewValue: 'Magister' },
        { value: 'PhD.', viewValue: 'Doctor/a' },
      ],
    },
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
      ced_inst: [
        this.data?.ced_inst || '',
        Validators.required,
        this.validateCedula.bind(this),
      ],
      nom_pat_inst: [this.data?.nom_pat_inst || '', Validators.required],
      nom_mat_inst: [this.data?.nom_mat_inst || ''],
      ape_pat_inst: [this.data?.ape_pat_inst || '', Validators.required],
      ape_mat_inst: [this.data?.ape_mat_inst || ''],
      tit_inst: [this.data?.tit_inst || '', Validators.required],
      puesto_inst: [this.data?.puesto_inst || '', Validators.required],
      url_firma: [this.data?.url_firma || ''],
    });

    this.previsualizacion = this.data?.url_firma || '';
  }
  validateCedula(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      const cedula = control.value;
      if (!/^\d+$/.test(cedula) || cedula.length !== 10) {
        resolve({ required: true });
      } else {
        const digitos = cedula.split('').map(Number);
        if (
          digitos[0] < 0 ||
          digitos[0] > 24 ||
          digitos[2] > 5 ||
          digitos[9] !== this.obtenerDigitoVerificador(digitos)
        ) {
          resolve({ invalidCedula: true });
        } else if (new Set(digitos).size === 1) {
          resolve({ invalidCedula: true });
        } else {
          resolve(null);
        }
      }
    });
  }

  obtenerDigitoVerificador(digitos: number[]): number {
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < coeficientes.length; i++) {
      const producto = digitos[i] * coeficientes[i];
      suma += producto > 9 ? producto - 9 : producto;
    }

    const residuo = suma % 10;
    return residuo === 0 ? 0 : 10 - residuo;
  }

  getErrorMessage() {
    console.log(
      'Cédula invalida:',
      this.emp_form.get('ced_inst')?.hasError('invalidCedula')
    );
    return this.emp_form.get('ced_inst')?.hasError('required')
      ? 'Campo requerido'
      : this.emp_form.get('ced_inst')?.hasError('invalidCedula')
      ? 'Cédula inválida'
      : '';
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
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
  showMessageError(
    message: string,
    duration: number = 5000,
    action: string = 'Ok'
  ) {
    this.snackBar.open(message, action, {
      duration, // Establecer la duración aquí
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  // Método para capturar el archivo seleccionado por el usuario
  capturarFile(event: any): void {
    const archivoCapturado = event.target.files[0];

    // Verificar la extensión del archivo
    if (!archivoCapturado.name.toLowerCase().endsWith('.png')) {
      this.showMessageError(
        'Archivo no soportado',
        archivoCapturado.name.toLowerCase
      );
      // Mostrar un mensaje de error o realizar alguna acción apropiada
      console.error('Solo se permiten archivos con extensión .png');
      return;
    }
    this.showMessage('Archivo cargado correctamente');

    // Continuar con el procesamiento del archivo
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
  // Método para manejar el evento keypress en el input de cédula
  onCedulaKeyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
