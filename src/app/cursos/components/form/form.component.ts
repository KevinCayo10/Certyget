import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from '../../services/cursos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { registerLicense } from '@syncfusion/ej2-base';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NAaF5cWWZCfEx3Rnxbf1x0ZFREal5UTndZUiweQnxTdEFjWH5acHRXQGFbUkF1XA=='
);

@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  compareInstructores = (a: any, b: any) => a.ced_inst === b.ced_inst;
  customToolbar: Object = {
    items: ['bold', 'Italic', 'Undo', 'Redo'],
  };
  emp_form!: FormGroup;
  title = '';
  togglePassword = true;
  isEdit: boolean;
  categorias: any[] = []; // Supongo que cada categoría tiene un formato similar a la data de cursos
  instructores: any[] = [];
  instructoresSeleccionados: any[] = [];
  previsualizacion!: string;
  archivos: any = [];
  detalleCursosInstructores: any = [];
  certificadoContent: any;
  estado_cur!: boolean;
  public toolbarSettings: ToolbarSettingsModel = {
    items: [
      'Bold',
      'Italic',
      'Underline',
      '|',
      'FontSize',
      'FontColor',
      '|',
      'SourceCode',
    ],
  };

  evento: any = '';
  fecha_inicio: any = '';
  duración: any = '';
  categoria: any = '';
  estado: any = false; // Inicializa el estado según sea necesario

  // Definir las etiquetas HTML permitidas

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private cursosService: CursosService,
    //private authorsService: AuthorsService, // Cambiado a authorsService
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,

    //private seccionService: SeccionService, // Cambiado a seccionService
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR EVENTO ACADÉMICO' : 'NUEVO EVENTO ACADÉMICO';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({});
  }
  // isSlideChecked: boolean = true;
  //toggleEvents: string[] = [];
  toggleChanges($event: MatSlideToggleChange) {
    //this.toggleEvents.push('Toggle Event: ' + $event.checked);
    this.estado_cur = $event.checked;
    if (this.estado_cur === false) {
      this.emp_form.disable();
    } else {
      this.emp_form.enable();
    }
  }
  instructores_form: any[] = [];

  ngOnInit(): void {
    this.loadForm();
    this.loadCategorys();
    this.loadInstructors();
  }

  loadInstructors() {
    this.cursosService.loadInstructors().subscribe((response) => {
      this.instructores = response.data;
    });
  }
  loadCategorys() {
    this.cursosService.loadCategorys().subscribe((response) => {
      this.categorias = response.data;
    });
  }
  loadForm() {
    this.estado_cur =
      this.data?.estado_cur === 1 || this.data?.estado_cur === undefined;

    this.emp_form = this.formBuilder.group({
      nom_cur: [this.data?.nom_cur || '', Validators.required],
      fecha_inicio_cur: [
        this.data?.fecha_inicio_cur || '',
        Validators.required,
      ],
      fecha_fin_cur: [this.data?.fecha_fin_cur || '', Validators.required],
      dur_cur: [this.data?.dur_cur || '', Validators.required],
      id_cate_cur: [this.data?.id_cate_cur || '', Validators.required],
      ced_inst: [this.data?.ced_inst || '', Validators.required],
      det_cer: [this.data?.det_cer || ''],
      url_cer: [this.data?.url_cer || ''],
      estado_cur: [this.estado_cur],
    });
    if (this.emp_form.value.det_cer == '') {
      this.certificadoContent = `<p>
            Por haber completado satisfactoriamente el diplomado de {{evento}} de la categoria {{categoria}}
            realizado el
            {{fecha_inicio}} con una duración de
            {{duración}}
          </p>`;
    } else {
      this.certificadoContent = this.emp_form.value.det_cer;
    }
    if (this.estado_cur === false) {
      this.emp_form.disable();
    }
    this.previsualizacion = this.data?.url_cer || '';
  }

  saveData() {
    // console.log('VALIDO : ', this.emp_form.valid);
    this.emp_form.enable();
    console.log('ESTADO : ', this.estado_cur);
    if (this.emp_form.valid) {
      const formData = this.buildFormData();
      if (this.data) {
        this.cursosService.updateCurso(this.data.id_cur, formData).subscribe(
          () => {
            this.showMessage('Registro editado correctamente');
            console.log('editando' + this.data.id_cur + formData);
            this.reference.close();
          },
          (err) => {
            this.showMessage(err.error.message);
            console.log(err);
          }
        );
      } else {
        try {
          console.log('HOLA');
          const formData = this.buildFormData();
          this.cursosService.addCursos(formData).subscribe(
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
  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
  buildFormData(): FormData {
    console.log('ESTADO : ', this.estado_cur);
    const formData = new FormData();
    formData.append('nom_cur', this.emp_form.value.nom_cur);
    formData.append('fecha_inicio_cur', this.emp_form.value.fecha_inicio_cur);
    formData.append('fecha_fin_cur', this.emp_form.value.fecha_fin_cur);
    formData.append('dur_cur', this.emp_form.value.dur_cur);
    formData.append('id_cate_cur', this.emp_form.value.id_cate_cur);
    formData.append('ced_inst', this.emp_form.value.ced_inst);
    formData.append('det_cer', this.emp_form.value.det_cer);
    formData.append('estado_cur', `${this.estado_cur === true ? 1 : 0} `);

    const nuevaImagen = this.archivos[0];
    if (nuevaImagen) {
      //formData.append('url_cer', this.emp_form.value.url_cer);
      formData.append('url_cer', nuevaImagen);
    } else {
      // Si no hay nueva imagen, verifica si hay una imagen existente y agrégala
      const imagenExistente = this.data?.url_cer;

      if (imagenExistente) {
        formData.append('url_cer', imagenExistente);
      }
    }

    return formData;
  }
}
interface Instructor {
  id_inst: number;
  // ... otras propiedades
}
