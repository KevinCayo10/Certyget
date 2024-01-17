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
@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  // Función para comparar instructores
  compareInstructores = (a: any, b: any) => a.ced_inst === b.ced_inst;
  // Configuración personalizada de la barra de herramientas
  customToolbar: Object = {
    items: ['bold', 'Italic', 'Undo', 'Redo'],
  };
  // Declaración del formulario
  emp_form!: FormGroup;
  title = '';
  togglePassword = true;
  isEdit: boolean;
  // Arreglos para almacenar datos
  categorias: any[] = [];
  instructores: any[] = [];
  instructoresSeleccionados: any[] = [];
  previsualizacion!: string;
  archivos: any = [];
  detalleCursosInstructores: any = [];
  certificadoContent = ` <p>
            Por haber completado satisfactoriamente el diplomado de {{nom_cur}} de la categoria {{nom_cate}}
            realizado el
            {{fecha_inicio_cur}} con una duración de
            {{dur_cur}}
          </p>`;
  // Configuración para el Editor de Texto Enriquecido
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
  // Variables para campos específicos del formulario
  nom_cur: any = '';
  fecha_inicio_cur: any = '';
  dur_cur: any = '';
  nom_cate: any = '';

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
    // Inicialización de variables y construcción del formulario
    this.title = data ? 'EDITAR CURSO' : 'NUEVO CURSO';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({});
  }
  instructores_form: any[] = [];

  ngOnInit(): void {
    this.loadForm();
    this.loadCategorys();
    this.loadInstructors();
  }
  // Cargar la lista de instructores
  loadInstructors() {
    this.cursosService.loadInstructors().subscribe((response) => {
      this.instructores = response.data;
    });
  }
  // Cargar la lista de categorías
  loadCategorys() {
    this.cursosService.loadCategorys().subscribe((response) => {
      this.categorias = response.data;
    });
  }
  // Cargar el formulario con los datos actuales si es una edición
  loadForm() {
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
    });

    this.previsualizacion = this.data?.url_cer || '';
  }
  // Guardar los datos del formulario
  saveData() {
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
  // Capturar archivo seleccionado
  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
    this.archivos.push(archivoCapturado);
  }
  // Extraer información base64 de una imagen
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
  // Mostrar mensaje en el snackbar
  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
  // Construir FormData con los datos del formulario
  buildFormData(): FormData {
    console.log('HORA');
    const formData = new FormData();
    formData.append('nom_cur', this.emp_form.value.nom_cur);
    formData.append('fecha_inicio_cur', this.emp_form.value.fecha_inicio_cur);
    formData.append('fecha_fin_cur', this.emp_form.value.fecha_fin_cur);
    formData.append('dur_cur', this.emp_form.value.dur_cur);
    formData.append('id_cate_cur', this.emp_form.value.id_cate_cur);
    formData.append('ced_inst', this.emp_form.value.ced_inst);
    formData.append('det_cer', this.emp_form.value.det_cer);

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
// Interfaz para el tipo de datos de un instructor
interface Instructor {
  id_inst: number;
}
