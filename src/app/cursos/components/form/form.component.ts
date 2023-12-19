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
@Component({
  selector: 'cer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  compareInstructores = (a: any, b: any) => a.ced_inst === b.ced_inst;

  emp_form: FormGroup;
  title = '';
  togglePassword = true;
  isEdit: boolean;
  categorias: any[] = []; // Supongo que cada categoría tiene un formato similar a la data de cursos
  instructores: any[] = [];
  instructoresSeleccionados: any[] = [];
  previsualizacion!: string;
  archivos: any = [];
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
    this.emp_form = this.formBuilder.group({
      nom_cur: new FormControl(this.data?.nom_cur),
      fecha_inicio_cur: new FormControl(this.data?.fecha_inicio_cur),
      fecha_fin_cur: new FormControl(this.data?.fecha_fin_cur),
      dur_cur: new FormControl(this.data?.dur_cur),
      id_cate_cur: new FormControl(this.data?.id_cate_cur),
      ced_inst: new FormControl(
        Array.isArray(this.data.ced_inst) ? this.data.ced_inst : []
      ),
      url_cer: new FormControl(this.data?.url_cer),
    });

    this.previsualizacion = this.data?.url_cer || '';
    console.log('Cargando esto: ', this.emp_form);
  }

  saveData() {
    console.log(this.emp_form);
    try {
      const formularioDatos = new FormData();
      formularioDatos.append('ced_inst', this.emp_form.value.ced_inst);
      formularioDatos.append('nom_cur', this.emp_form.value.nom_cur);
      formularioDatos.append(
        'fecha_inicio_cur',
        this.emp_form.value.fecha_inicio_cur
      );
      formularioDatos.append(
        'fecha_fin_cur',
        this.emp_form.value.fecha_fin_cur
      );
      formularioDatos.append('dur_cur', this.emp_form.value.dur_cur);
      formularioDatos.append('id_cate_cur', this.emp_form.value.id_cate_cur);
      this.archivos.forEach((archivo: any) => {
        console.log(archivo);
        formularioDatos.append('url_firma', archivo);
      });
      console.log(formularioDatos);
      this.cursosService.addCursos(formularioDatos).subscribe(
        (res) => {
          console.log(res);
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
}
interface Instructor {
  id_inst: number;
  // ... otras propiedades
}
